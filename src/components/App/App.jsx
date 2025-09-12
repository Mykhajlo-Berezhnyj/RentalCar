import { Suspense, useEffect } from "react";
import "./App.css";
import AppBar from "../AppBar/AppBar";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../Page/HomePage/HomePage";
import CatalogPage from "../../Page/CatalogPage/CatalogPage.jsx";
import DetailsPage from "../../Page/DetailsPage/DetailsPage";
import { useDispatch } from "react-redux";
import { fetchBrands } from "../../redux/brands/operations.js";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "../../Page/NotFoundPage/NotFoundPage.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  return (
    <div className="container">
      <AppBar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-center" autoClose={1000} />
    </div>
  );
}

export default App;
