import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Button/Button";
import css from "./ClearFiltersButton.module.css";
import { selectFilters } from "../../../redux/filters/selectors";
import { initialState, resetFilters } from "../../../redux/filters/slice";
import { fetchCars } from "../../../redux/cars/operation";
import { resetCarsState, setHasFilters } from "../../../redux/cars/slice";
import { useState } from "react";
import { selectHasFilters } from "../../../redux/cars/selectors";

export default function ClearFiltersButton() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const hasFilters = useSelector(selectHasFilters);

  const isFilterActive =
    JSON.stringify(filters) !== JSON.stringify(initialState);

  const handleReset = () => {
    dispatch(setHasFilters(false));
    dispatch(resetFilters());
    dispatch(resetCarsState());
    dispatch(fetchCars({ page: 1 }));
  };

  if (!isFilterActive || !hasFilters) return null;

  return (
    <Button
      size="wait"
      className={css.reset}
      aria-label="Reset Filters"
      title="Reset Filters"
      onClick={handleReset}
    >
      x Reset Filters
    </Button>
  );
}
