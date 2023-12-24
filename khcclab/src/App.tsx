import { publicRoutes } from "routes/routes";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      {publicRoutes.map((item) => {
        return <Route element={item.element} path={item.path} />;
      })}
    </Routes>
  );
}

export default App;
