import Icon from "../../Icon/Icon";
import IconText from "../IconTxt/IconTxt";
import css from "./CarAccessories.module.css";

export default function CarAccessories({ car }) {
  return (
    <div className={css.accessories}>
      <h3>Accessories and functionalities:</h3>
      <ul className={css.accesList}>
        {car.accessories.map((accessorie, id) => (
          <li key={id}>
            <IconText
              icon={<Icon iconName="check-circle" className={css.icon} />}
            >
              {accessorie}
            </IconText>
          </li>
        ))}
      </ul>
    </div>
  );
}
