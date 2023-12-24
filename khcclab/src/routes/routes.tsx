
import { Login } from "pages/auth/Login";
import { SignUp } from "pages/auth/SignUp";
import { iRoute } from "types/route";

export const publicRoutes: iRoute[] = [
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/signUp",
        element: <SignUp />,
    },
]
export const nursingRoutes: iRoute[] = [
    {
        path: "/add-patient",
        element: <Login />,
        pageName: "add patient"
    },
    {
        path: "/patient-list",
        element: <SignUp />,
        pageName: "patient list"
    },
    {
        path: "/add-samples",
        element: <SignUp />,
        pageName: "Add Samples"
    },
];