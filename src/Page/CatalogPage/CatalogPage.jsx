import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button/Button";
import CardList from "../../components/CarList/CarList";
import Container from "../../components/Container/Container";
import { nextPage, resetCarsState, setPage } from "../../redux/cars/slice";
import {
  selectCars,
  selectCarsStatus,
  selectisLoading,
  selectPagination,
} from "../../redux/cars/selectors";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operation";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import { selectFilters } from "../../redux/filters/selectors";
import css from "./CatalogPage.module.css";
import { fetchBrands } from "../../redux/brands/operations";
import { selectError } from "../../redux/orders/selectors";
import Loader from "../../components/Loader/Loader";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { page, totalPages } = useSelector(selectPagination);
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectisLoading);
  const status = useSelector(selectCarsStatus);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  useEffect(() => {
    dispatch(resetCarsState());
    dispatch(fetchCars({ page: 1, filters }));
  }, [dispatch]);

  useEffect(() => {
    if (page > 1) {
      dispatch(fetchCars({ page, filters }));
    }
  }, [page, dispatch]);

  const handleClick = () => {
    dispatch(nextPage());
  };

  return (
    <div className={css.sectionCatalog}>
      <Container className={css.catalog}>
        <FilterPanel />
        {isLoading && page === 1 && <Loader />}
        {cars.length === 0 && status === "succeeded" && (
          <p className={css.noCars}>No cars found. Try adjusting filters.</p>
        )}
        {error && <p className={css.error}>{error}</p>}
        <CardList cars={cars} />
        {isLoading && page > 1 && <Loader />}
        {cars.length > 0 && page < totalPages && (
          <Button size="btnWhite" onClick={handleClick} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load more"}
          </Button>
        )}
      </Container>
    </div>
  );
}
