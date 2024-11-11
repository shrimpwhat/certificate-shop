import "./styles.css";

import { useSelector } from "react-redux";
import { getStep } from "../../store";

export default function Stepper() {
  const step = useSelector(getStep);

  return (
    <div className="stepper">
      <div
        className={`stepper__item ${step === 1 ? "stepper__item_active" : ""}`}
      >
        <span className="stepper__index">1</span>
        <p className="stepper__text">Выберите сертификат</p>
      </div>
      <hr />
      <div
        className={`stepper__item ${step === 2 ? "stepper__item_active" : ""}`}
      >
        <span className="stepper__index">2</span>
        <p className="stepper__text">Заполните данные</p>
      </div>
      <hr />
      <div
        className={`stepper__item ${step === 3 ? "stepper__item_active" : ""}`}
      >
        <span className="stepper__index">3</span>
        <p className="stepper__text">Оплатите</p>
      </div>
    </div>
  );
}
