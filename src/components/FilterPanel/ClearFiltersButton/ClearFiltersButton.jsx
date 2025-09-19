import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Button/Button";
import css from "./ClearFiltersButton.module.css";
import { selectFilters } from "../../../redux/filters/selectors";
import { initialState, resetFilters } from "../../../redux/filters/slice";
import { fetchCars } from "../../../redux/cars/operation";
import { resetCarsState } from "../../../redux/cars/slice";
import { selectPagination } from "../../../redux/cars/selectors";

export default function ClearFiltersButton() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  console.log("🚀 ~ ClearFiltersButton ~ filters:", filters);
  const { page } = useSelector(selectPagination);
  const isFilterActive =
    filters.brand !== null ||
    filters.rentalPrice !== null ||
    filters.minMileage !== null ||
    filters.maxMileage !== null;

  const handleReset = () => {
    if (isFilterActive || page > 1) {
      dispatch(resetFilters());
      dispatch(resetCarsState());
      dispatch(fetchCars({ page: 1 }));
    } else {
      dispatch(resetFilters());
    }
  };

  console.log("🚀 ~ ClearFiltersButton ~ isFilterActive:", isFilterActive);
  if (!isFilterActive && page === 1) return null;

  return (
    <>
      {((!isFilterActive && page > 1) || isFilterActive) && (
        <Button
          size="wait"
          className={css.reset}
          aria-label="Reset Filters"
          title="Reset Filters"
          onClick={handleReset}
        >
          x Reset Filters
        </Button>
      )}
    </>
  );
}
