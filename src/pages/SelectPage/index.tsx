import "./styles.css";
import SelectCertificate from "../../components/SelectCertificate";
import { useSelector } from "react-redux";
import { getSelectedItem, setStep, useAppDispatch } from "../../store";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function SelectPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStep(1));
  }, [dispatch]);

  const item = useSelector(getSelectedItem);

  const sum = new Intl.NumberFormat("ru", {
    style: "currency",
    currency: "RUB",
  }).format(parseFloat(item?.SUMMA ?? ""));

  const price = new Intl.NumberFormat("ru", {
    style: "currency",
    currency: "RUB",
  }).format(parseFloat(item?.PRICE ?? ""));

  return (
    <div className="container">
      <p className="description">Выберите сертификат для покупки</p>
      <SelectCertificate />

      {item && (
        <div className="price__container">
          <p>
            Цена: <span className="price__initial">{price}</span>
            <span className="price__actual">{sum}</span>
          </p>
          <Link className="price__btn" to="/form">
            Оформить
          </Link>
        </div>
      )}
    </div>
  );
}
