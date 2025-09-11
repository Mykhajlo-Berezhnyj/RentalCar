import Icon from "../../Icon/Icon";
import IconText from "../IconTxt/IconTxt";
import css from "./CarSpecifications.module.css";

export default function CarSpecifications({ car }) {
  return (
    <div className={css.CarSpecifications}>
      <h3>Car Specifications:</h3>
      <ul className={css.specList}>
        <li>
          <IconText icon={<Icon iconName="calendar" className={css.icon} />}>
            Year: {car.year}
          </IconText>
        </li>
        <li>
          <IconText icon={<Icon iconName="car" className={css.icon} />}>
            Type: {car.type}
          </IconText>
        </li>
        <li>
          <IconText icon={<Icon iconName="fuel-pump" className={css.icon} />}>
            Fuel Consumption: {car.fuelConsumption}
          </IconText>
        </li>
        <li>
          <IconText icon={<Icon iconName="gear" className={css.icon} />}>
            Engine Size: {car.engineSize}
          </IconText>
        </li>
      </ul>
    </div>
  );
}
