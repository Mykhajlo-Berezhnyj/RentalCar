import Icon from "../../Icon/Icon";
import IconText from "../IconTxt/IconTxt";
import css from "./SectionConditions.module.css";

export default function SectionConditions({ car }) {
  return (
    <div className={css.conditions}>
      <h3>Rental Conditions:</h3>
      <ul className={css.conditionsList}>
        {car.rentalConditions.map((condition, index) => (
          <li className={css.conditionItem} key={index}>
            <IconText
              icon={<Icon iconName="check-circle" className={css.icon} />}
            >
              {condition}
            </IconText>
          </li>
        ))}
      </ul>
    </div>
  );
}
