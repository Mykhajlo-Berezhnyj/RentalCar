import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import AppBar from "../AppBar/AppBar";
import { Route, Routes } from "react-router-dom";
// import HomePage from "../../Page/HomePage/HomePage";
// import CatalogPage from "../../Page/CatalogPage/CatalogPage.jsx";
// import DetailsPage from "../../Page/DetailsPage/DetailsPage";
import { useDispatch } from "react-redux";
import { fetchBrands } from "../../redux/brands/operations.js";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "../../Page/NotFoundPage/NotFoundPage.jsx";
import Loader from "../Loader/Loader.jsx";
import OrdersPage from "../../Page/OrdersPage/OrdersPage.jsx";

const HomePage = lazy(() => import("../../Page/HomePage/HomePage"));
const CatalogPage = lazy(() => import("../../Page/CatalogPage/CatalogPage"));
const DetailsPage = lazy(() => import("../../Page/DetailsPage/DetailsPage"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  return (
    <div className="container">
      <AppBar />
      <div className="pageContent">
        <Suspense fallback={<Loader className="fallbackLoader" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<DetailsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      <ToastContainer position="top-center" autoClose={1000} />
    </div>
  );
}

export default App;
