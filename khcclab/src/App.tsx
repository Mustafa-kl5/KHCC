import { getRoutes, publicRoutes } from "routes/routes";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ApiService from "./services/api";
import { useEffect, useState } from "react";
import { isLoggedIn } from "services/authService";
import { USER_ROLE } from "utils/constant";
import { iRoute } from "types/route";

function App() {
  const location = useLocation()
  const [privateRoutes, setPrivateRoutes] = useState<
    iRoute[] | string | undefined
  >([]);
  useEffect(() => {
    ApiService.init();
  }, []);
  useEffect(() => {
    if (isLoggedIn()) {
      setPrivateRoutes(getRoutes(localStorage.getItem(USER_ROLE) || "pending"));
    }
  }, [location.pathname])

  return (
    <Routes>
      {publicRoutes.map((item) => {
        return (
          <Route key={item.path} element={item.element} path={item.path} />
        );
      })}
      {(privateRoutes as iRoute[]).map((item: iRoute) => {
        return (
          <Route key={item.path} element={item.element} path={item.path} />
        );
      })}
    </Routes>
  );
}

export default App;
