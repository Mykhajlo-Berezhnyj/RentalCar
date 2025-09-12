import { useDispatch, useSelector } from "react-redux";
import FilterSelect from "./FilterSelect/FilterSelect";
import { selectBrands } from "../../redux/brands/selectors";
import { selectFilters } from "../../redux/filters/selectors";
import css from "./FilterPanel.module.css";
import { setBrand, setPrice } from "../../redux/filters/slice";

export default function FilterPanel() {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const prices = Array.from({length: 10}, (_, i) =>(i+1)*10);

  return (
    <div>
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
      <FilterSelect
      label="Price/ 1 hour"
      name="price"
      disabledValue="Choose a price"
      array={prices}
      className={css.price}
      onChange={(selectedOption) => {
        dispatch(setPrice(selectedOption.value));
      }}
        />
    </div>
  );
}
