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
  placeholder: (base) => ({
    ...base,
    margin: 0,
    color: "var(--font-main)",
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
      ? "#007bff"
      : state.isFocused
      ? "#e6f0ff"
      : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    "&:active": {
      backgroundColor: "#cce0ff",
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#333",
    padding: 4,
  }),
  indicatorSeparator: (base) => ({
    display: "none",
  }),
};
