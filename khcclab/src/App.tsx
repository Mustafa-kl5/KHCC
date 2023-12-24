

import { nursingRoutes, publicRoutes } from "routes/routes";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Routes>
      {publicRoutes.map(item => {
        return <Route key={item.path} element={item.element} path={item.path} />
      })}
      {nursingRoutes.map(item => {
        return <Route key={item.path} element={item.element} path={item.path} />
      })}
    </Routes>
  );
}

export default App;
