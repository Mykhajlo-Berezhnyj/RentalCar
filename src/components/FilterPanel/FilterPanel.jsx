import { useDispatch, useSelector } from "react-redux";
import FilterSelect from "./FilterSelect/FilterSelect";
import { selectBrands } from "../../redux/brands/selectors";
import { selectFilters } from "../../redux/filters/selectors";
import css from "./FilterPanel.module.css";
import { setBrand } from "../../redux/filters/slice";

export default function FilterPanel() {
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();

  return (
    <FilterSelect
      label="Car brand"
      name="brand"
      disabledValue="Choose a brand"
      array={brands}
      className={css.brand}
      onChange={(selectedOption) => {
        dispatch(setBrand(selectedOption.value));
      }}
    />
  );
}
