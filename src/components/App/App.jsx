import { lazy, Suspense } from "react";
import "./App.css";
import AppBar from "../AppBar/AppBar";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "../../Page/NotFoundPage/NotFoundPage.jsx";
import Loader from "../Loader/Loader.jsx";
import OrdersPage from "../../Page/OrdersPage/OrdersPage.jsx";
import ScrollToTop from "../ScrollToTop/ScrollToTop.jsx";
import FavoritesPage from "../../Page/FavoritesPage/FavoritesPage.jsx";

const HomePage = lazy(() => import("../../Page/HomePage/HomePage"));
const CatalogPage = lazy(() => import("../../Page/CatalogPage/CatalogPage"));
const DetailsPage = lazy(() => import("../../Page/DetailsPage/DetailsPage"));

function App() {
  return (
    <div className="container">
      <AppBar />
      <div className="pageContent">
        <Suspense fallback={<Loader className="fallbackLoader" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:carId" element={<DetailsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:carId/:orderId" element={<DetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      <ScrollToTop />
      <ToastContainer
        toastClassName="myToast"
        position="top-center"
        autoClose={3500}
      />
    </div>
  );
}

export default App;
