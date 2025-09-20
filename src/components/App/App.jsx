import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import AppBar from "../AppBar/AppBar";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "../../Page/NotFoundPage/NotFoundPage.jsx";
import Loader from "../Loader/Loader.jsx";
import ScrollToTop from "../ScrollToTop/ScrollToTop.jsx";
import ProfilePage from "../../Page/ProfilePage/ProfilePage.jsx";

const HomePage = lazy(() => import("../../Page/HomePage/HomePage"));
const CatalogPage = lazy(() => import("../../Page/CatalogPage/CatalogPage"));
const DetailsPage = lazy(() => import("../../Page/DetailsPage/DetailsPage"));

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <AppBar theme={theme} setTheme={setTheme} />
      <div className="pageContent">
        <Suspense fallback={<Loader className="fallbackLoader" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:carId" element={<DetailsPage />} />
            <Route path="/orders" element={<ProfilePage />} />
            <Route path="/orders/:carId/:orderId" element={<DetailsPage />} />
            <Route path="/favorites" element={<ProfilePage />} />
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
    </>
  );
}

export default App;
