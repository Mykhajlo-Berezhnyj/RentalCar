import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button/Button";
import CardList from "../../components/CarList/CarList";
import Container from "../../components/Container/Container";
import {
  nextPage,
  resetCarsState,
  setLimit,
  setPage,
} from "../../redux/cars/slice";
import {
  selectCars,
  selectCarsStatus,
  selectisLoading,
  selectPagination,
} from "../../redux/cars/selectors";
import { useEffect, useRef, useState } from "react";
import { fetchCars } from "../../redux/cars/operation";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import { selectFilters } from "../../redux/filters/selectors";
import css from "./CatalogPage.module.css";
import { fetchBrands } from "../../redux/brands/operations";
import { selectError } from "../../redux/orders/selectors";
import Loader from "../../components/Loader/Loader";
import {
  setBrand,
  setMaxMileage,
  setMinMileage,
  setRentalPrice,
} from "../../redux/filters/slice";
import { useSearchParams } from "react-router-dom";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { page, totalPages, limit } = useSelector(selectPagination);
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectisLoading);
  const status = useSelector(selectCarsStatus);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters);
  const [searchParams, setSearchParams] = useSearchParams();
  const { brand, rentalPrice, minMileage, maxMileage } = filters;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  useEffect(() => {
    dispatch(resetCarsState());
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const limitFromUrl = Number(searchParams.get("limit")) || 12;
    const brandFromUrl = searchParams.get("brand") || null;
    const rentalPriceFromUrl = searchParams.get("rentalPrice") || null;
    const minMileageFromUrl = searchParams.get("minMileage") || null;
    const maxMileageFromUrl = searchParams.get("maxMileage") || null;

    dispatch(setPage(pageFromUrl));
    dispatch(setLimit(limitFromUrl));
    dispatch(setBrand(brandFromUrl || null));
    dispatch(
      setRentalPrice(rentalPriceFromUrl ? Number(rentalPriceFromUrl) : null)
    );
    dispatch(setMinMileage(minMileageFromUrl || null));
    dispatch(setMaxMileage(maxMileageFromUrl || null));
    setIsReady(true);
  }, []);

  useEffect(() => {
    setSearchParams({
      ...{ page },
      ...(limit && { limit }),
      ...(brand && { brand }),
      ...(rentalPrice && { rentalPrice }),
      ...(minMileage && { minMileage }),
      ...(maxMileage && { maxMileage }),
    });
  }, [
    page,
    limit,
    brand,
    rentalPrice,
    minMileage,
    maxMileage,
    setSearchParams,
  ]);

  useEffect(() => {
    if (isReady) {
      dispatch(fetchCars({ page, filters, limit }));
    }
  }, [isReady, page]);

  const handleClick = () => {
    const next = page + 1;
    dispatch(setPage(next));
    dispatch(fetchCars({ page: next, limit, filters }));
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
