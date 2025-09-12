import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Button/Button";
import css from "./ClearFiltersButton.module.css";
import { selectFilters } from "../../../redux/filters/selectors";
import { initialState, resetFilters } from "../../../redux/filters/slice";
import { fetchCars } from "../../../redux/cars/operation";
import { resetCarsState } from "../../../redux/cars/slice";

export default function ClearFiltersButton() {
    const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const isFilterActive =
    JSON.stringify(filters) !== JSON.stringify(initialState);
  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(resetCarsState());
    dispatch(fetchCars({page: 1}));
  };

  if (!isFilterActive) return null;

  return (
    <Button
      size="wait"
      className={css.reset}
      aria-label="Reset Filters"
      title ="Reset Filters"
      onClick={handleReset}
    >
      x Reset Filters
    </Button>
  );
}
