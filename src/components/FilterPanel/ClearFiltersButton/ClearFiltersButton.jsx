import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Button/Button";
import css from "./ClearFiltersButton.module.css";
import { selectFilters } from "../../../redux/filters/selectors";
import { resetFilters } from "../../../redux/filters/slice";
import { fetchCars } from "../../../redux/cars/operation";
import { resetCarsState, setHasSearch } from "../../../redux/cars/slice";
import {
  selectCarsStatus,
  selectHasSearch,
  selectPagination,
} from "../../../redux/cars/selectors";

export default function ClearFiltersButton() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const { page } = useSelector(selectPagination);
  const hasSearch = useSelector(selectHasSearch);

  const isFilterActive =
    filters.brand !== null ||
    filters.rentalPrice !== null ||
    filters.minMileage !== null ||
    filters.maxMileage !== null;

  const handleReset = () => {
    if (hasSearch || page > 1) {
      dispatch(resetFilters());
      dispatch(resetCarsState());
      dispatch(setHasSearch(false));
      dispatch(fetchCars({ page: 1 }));
    } else {
      dispatch(resetFilters());
    }
  };

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
