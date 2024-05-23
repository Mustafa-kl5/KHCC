import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { router } from "routes/routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ToastMassage from "Components/Shared/ToastMassage";
import api from "services/api";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
api.init();
root.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RouterProvider router={router} />
      <ToastMassage />
    </LocalizationProvider>
  </Provider>
);
