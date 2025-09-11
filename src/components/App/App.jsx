import { Suspense, useEffect } from "react";
import "./App.css";
import AppBar from "../AppBar/AppBar";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../Page/HomePage/HomePage";
import CatalogPage from "../../Page/CatalogPage/CatalogPage.jsx";
import DetailsPage from "../../Page/DetailsPage/DetailsPage";
import { useDispatch } from "react-redux";
import { fetchBrands } from "../../redux/brands/operations.js";

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
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
