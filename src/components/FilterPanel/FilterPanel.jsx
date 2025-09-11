import { useSelector } from "react-redux";
import FilterSelect from "./FilterSelect/FilterSelect";
import { selectBrands } from "../../redux/brands/selectors";

export default function FilterPanel() {
  const brands = useSelector(selectBrands);

  return (
    <FilterSelect
      label="Car brand"
      name="brand"
      disabledValue="Choose a brand"
      array={brands}
    />
  );
}
