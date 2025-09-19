import { useDispatch, useSelector } from "react-redux";
import FilterSelect from "./FilterSelect/FilterSelect";
import { selectBrands } from "../../redux/brands/selectors";
import { selectFilters } from "../../redux/filters/selectors";
import css from "./FilterPanel.module.css";
import {
  setBrand,
  setMaxMileage,
  setMinMileage,
  setRentalPrice,
} from "../../redux/filters/slice";
import { Button } from "../Button/Button";
import FilterInput from "./FilterInput/FilterInput";
import { fetchCars } from "../../redux/cars/operation";
import { resetCarsState } from "../../redux/cars/slice";
import ClearFiltersButton from "./ClearFiltersButton/ClearFiltersButton";
import { useEffect, useState } from "react";
import { selectPagination } from "../../redux/cars/selectors";

export default function FilterPanel() {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const prices = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
  const filters = useSelector(selectFilters);
  const [error, setError] = useState(null);
  const { limit } = useSelector(selectPagination);

  const min = filters.minMileage ?? null;
  const max = filters.maxMileage ?? Infinity;

  const isValid = !min || !max || Number(max) >= Number(min);

  useEffect(() => {
    if (!isValid) {
      setError("Max mileage must be greater than or equal to Min mileage");
    } else {
      setError(null);
    }
  }, [isValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetCarsState());
    dispatch(fetchCars({ page: 1, limit, filters }));
  };

  return (
    <form className={css.filterPanel} onSubmit={handleSubmit}>
      <FilterSelect
        label="Car brand"
        name="brand"
        disabledValue="Choose a brand"
        array={brands}
        className={css.brand}
        value={filters.brand}
        onChange={(value) => {
          dispatch(setBrand(value));
        }}
      />
      <FilterSelect
        label="Price/ 1 hour"
        name="rentalPrice"
        disabledValue="Choose a price"
        array={prices}
        value={filters.rentalPrice}
        className={css.price}
        onChange={(value) => {
          dispatch(setRentalPrice(value));
        }}
      />
      <div className={css.mileage}>
        <p className="txtSecond">Car mileage / km</p>
        <div className={css.inputBlock}>
          <FilterInput
            name="minMileage"
            label="From"
            value={filters.minMileage}
            onChange={(val) => dispatch(setMinMileage(val))}
            className={css.inputWrapper}
          />
          <FilterInput
            name="maxMileage"
            label="To"
            value={filters.maxMileage}
            className={css.inputWrapper}
            onChange={(val) => dispatch(setMaxMileage(val))}
          />
        </div>
        {error ? <p className={css.error}>{error}</p> : null}
      </div>
      <div className={css.btnWrapper}>
        <Button
          type="submit"
          size="btnFill"
          className={css.btnSearch}
          aria-label="Search cars"
          title="Search cars"
          disabled={!isValid}
        >
          Search
        </Button>
        <ClearFiltersButton />
      </div>
    </form>
  );
}
