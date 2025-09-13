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
      : ""
  );

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setVal(Number(value).toLocaleString("en-US"));
    } else {
      setVal("");
    }
  }, [value]);

  const handleChange = (e) => {
    const input = e.target.value;
    // .replace(/,/g, "");
    if (/^\d*$/.test(input)) {
      setVal(input);
    }
  };

  const handleBlur = () => {
    const num = val ? Number(val.replace(/,/g, "")) : null;
    const formatted = num ? Number(num).toLocaleString("en-US") : null;
    setVal(formatted);
    onChange(num);
  };

  const handleFocus = () => {
    setVal(value ? value.toString() : "");
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
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    </div>
  );
}
