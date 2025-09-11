import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button/Button";
import CardList from "../../components/CarList/CarList";
import Container from "../../components/Container/Container";
import { nextPage } from "../../redux/cars/slice";
import { selectisLoading, selectPagination } from "../../redux/cars/selectors";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operation";
import FilterPanel from "../../components/FilterPanel/FilterPanel";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { page } = useSelector(selectPagination);
  const isLoading = useSelector(selectisLoading);

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchCars());
    }
  }, [dispatch, page]);

  const handleClick = () => {
    dispatch(nextPage());
  };

  return (
    <Container>
      <FilterPanel />
      <CardList />
      <Button size="btnWhite" oneClick={handleClick}>
        Load more
      </Button>
    </Container>
  );
}
