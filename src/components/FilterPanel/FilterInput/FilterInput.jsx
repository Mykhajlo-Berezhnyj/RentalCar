import { useEffect, useState } from "react";
import css from "./FilterInput.module.css";

export default function FilterInput({
  name,
  label,
  value,
  onChange,
  className,
}) {
  const [val, setVal] = useState(
    typeof value === "string" || typeof value === "number"
      ? value.toString()
      : null
  );

  useEffect(() => {
    setVal(value !== null && value !== undefined ? value.toString() : "");
  }, [value]);

  const handeChange = (e) => {
    const input = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(input)) {
      setVal(input);
      //   onChange(Number(input));
    }
  };

  const handleBlur = () => {
    const num = val ? Number(val) : null;
    console.log("🚀 ~ handleBlur ~ num:", num);
    const formatted = val ? Number(val).toLocaleString("en-US") : null;
    setVal(formatted);
    onChange(num);
  };

  const handleFocus = () => {
    setVal(value.toString());
  };

  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        inputMode="numeric"
        name={name}
        value={val}
        aria-label={`Mileage ${label}`}
        title={`Input mileage ${label}, example: 2500`}
        className={css.input}
        onChange={handeChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    </div>
  );
}
