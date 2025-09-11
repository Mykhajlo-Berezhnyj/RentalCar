import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button/Button";
import CardList from "../../components/CarList/CarList";
import Container from "../../components/Container/Container";
import { nextPage, resetCarsState, setPage } from "../../redux/cars/slice";
import {
  selectCars,
  selectisLoading,
  selectPagination,
} from "../../redux/cars/selectors";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operation";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import { selectFilters } from "../../redux/filters/selectors";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { page, totalPages } = useSelector(selectPagination);
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectisLoading);
  const filters = useSelector(selectFilters);

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
    <Container>
      <FilterPanel />
      <CardList />
      {cars.length > 0 && page < totalPages && (
        <Button size="btnWhite" onClick={handleClick} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load more"}
        </Button>
      )}
    </Container>
  );
}
