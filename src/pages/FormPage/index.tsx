import "./styles.css";

import { useEffect, useMemo } from "react";
import { Form, Link, Navigate, useNavigate } from "react-router-dom";
import {
  getSelectedItem,
  getStep,
  getFormFields,
  setStep,
  setFormFields,
  useAppDispatch,
} from "../../store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useSaleMutation } from "../../store/api";

type UserFormData = {
  name: string;
  phone: string;
  email: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Имя должно быть заполнено"),
  phone: yup
    .string()
    .required("Телефон должен быть заполнен")
    .matches(/^\+7\d{10}$/, "Телефон должен быть в формате +7XXXXXXXXXX"),
  email: yup
    .string()
    .email("Вы ввели некорректную почту")
    .required("Почта должна быть заполнена"),
});

export default function FormPage() {
  const navigate = useNavigate();

  const formFields = useSelector(getFormFields);
  const step = useSelector(getStep);
  const item = useSelector(getSelectedItem);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: formFields,
  });

  useEffect(() => {
    if (step !== 0) {
      dispatch(setStep(2));
    }
  }, [dispatch, step]);

  const [processSale] = useSaleMutation();

  const salePrice = useMemo(() => {
    if (!item) return "";

    return new Intl.NumberFormat("ru", {
      style: "currency",
      currency: "RUB",
    }).format(parseFloat(item.SUMMA));
  }, [item]);

  useEffect(() => {
    const subscription = watch((value) => dispatch(setFormFields(value)));
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  if (step === 0) {
    return <Navigate to="/" />;
  }

  const onSubmit = (data: UserFormData) => {
    if (!item) return;

    dispatch(setFormFields(data));
    processSale({
      ...data,
      item,
    });

    navigate("/payment");
  };

  return (
    <div className="container">
      <p className="description">{item?.NAME}</p>
      <Form className="form" onSubmit={handleSubmit(onSubmit)} navigate={false}>
        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            {...register("name")}
            placeholder="Ваше имя"
            className="form-control"
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Телефон</label>
          <input
            id="phone"
            {...register("phone")}
            type="tel"
            inputMode="tel"
            placeholder="+79999999999"
            className="form-control"
          />
          {errors.phone && (
            <p className="error-message">{errors.phone.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Почта</label>
          <input
            id="email"
            {...register("email")}
            type="email"
            placeholder="example@mail.com"
            className="form-control"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <p>К оплате - {salePrice}</p>
        <div className="buttons">
          <button type="submit" className="btn-submit">
            Оплатить
          </button>
          <Link to="/">
            <button type="button">Назад</button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
