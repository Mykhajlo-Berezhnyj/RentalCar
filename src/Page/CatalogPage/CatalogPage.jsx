import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button/Button";
import CardList from "../../components/CarList/CarList";
import Container from "../../components/Container/Container";
import { nextPage, setLimit, setPage } from "../../redux/cars/slice";
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

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const limitFromUrl = Number(searchParams.get("limit")) || 12;
    const brandFromUrl = searchParams.get("brand") || "";
    const rentalPriceFromUrl = searchParams.get("rentalPrice") || "";
    const minMileageFromUrl = searchParams.get("minMileage") || "";
    const maxMileageFromUrl = searchParams.get("maxMileage") || "";

    dispatch(setPage(pageFromUrl));
    dispatch(setLimit(limitFromUrl));
    dispatch(setBrand(brandFromUrl));
    dispatch(setRentalPrice(rentalPriceFromUrl));
    dispatch(setMinMileage(minMileageFromUrl));
    dispatch(setMaxMileage(maxMileageFromUrl));
    dispatch(
      fetchCars({
        page: pageFromUrl,
        filters: {
          brand: brandFromUrl,
          rentalPrice: rentalPriceFromUrl,
          minMileage: minMileageFromUrl,
          maxMileage: maxMileageFromUrl,
          limit: limitFromUrl,
        },
      })
    );
  }, []);

  useEffect(() => {
    setSearchParams({
      page,
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
    if (page > 1) {
      dispatch(
        fetchCars({
          page,
          filters: {
            ...filters,
            limit,
          },
        })
      );
    }
  }, [page, dispatch, filters, limit]);

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
