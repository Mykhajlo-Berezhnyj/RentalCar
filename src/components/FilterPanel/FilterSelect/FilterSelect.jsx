import clsx from "clsx";
import css from "./FilterSelect.module.css";

export default function FilterSelect({
  label,
  name,
  disabledValue,
  array,
  className,
}) {
  return (
    <div className={clsx(css.selectFilter, className)}>
      <label htmlFor={name}>{label}</label>
      <select className={css.select} name={name} id={name} defaultValue="">
        <option value="" disabled>
          {disabledValue}
        </option>
        {array.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
