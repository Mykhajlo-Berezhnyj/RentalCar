// src/components/FilterSelect/selectStyles.js
export const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "var(--inputs)",
    border: "none",
    boxShadow: "none",
    height: 44,
    padding: "0 8px",
    // padding: "12px 16px",
    borderRadius: "var(--radius)",
    display: "flex",
    alignItems: "center",
    "&:hover": { borderColor: "#555" },
  }),
  valueContainer: (base) => ({
    ...base,
    // height: 16,
    margin: 0,
    padding: "0 8px",
    display: "flex",
    alignItems: "center",
  }),
  placeholder: (base, state) => ({
    ...base,
    margin: 0,
    color: state.selectProps.error ? "red" : "var(--font-main)",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#333",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#fff",
    borderRadius: 8,
    zIndex: 10,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#F7F7F7"
      : state.isFocused
      ? "#e6f0ff"
      : "#fff",
    color: state.isSelected ? "#101828" : "#8D929A",
    "&:active": {
      color: "#101828",
    },
    "&:hover": {
      color: "#101828",
      backgroundColor: "#F7F7F7",
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#101828",
    padding: 4,
    size: 16,
  }),
  indicatorSeparator: (base) => ({
    display: "none",
  }),
};
