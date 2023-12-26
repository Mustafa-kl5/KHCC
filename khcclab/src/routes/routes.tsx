
import { NoPermission } from "pages/NoPermission";
import { Login } from "pages/auth/Login";
import { SignUp } from "pages/auth/SignUp";
import { AddPatient } from "pages/nursing/AddPatient";
import { AddSamples } from "pages/nursing/AddSamples";
import { PatientList } from "pages/nursing/PatientList";
import { iRoute } from "types/route";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
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
        element: <AddPatient />,
        pageName: "Add Patient",
        icon: <PersonAddAltIcon />
    },
    {
        path: "/patient-list",
        element: <PatientList />,
        pageName: "Patient List",
        icon: <ListAltIcon />
    },
    {
        path: "/add-samples/:userId",
        element: <AddSamples />,
        pageName: "Add Samples",
        icon: <BorderColorIcon />,
        notShown: true
    },
];
export const superAdminRoutes: iRoute[] = [
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
export const technicianRoutes: iRoute[] = [
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
export const pending: iRoute[] = [
    {
        path: "/",
        element: <NoPermission />,
        pageName: "No permission"
    },
];
export const getRoutes = (role: string) => {
    switch (role) {
        case "nursing":
            return nursingRoutes
        case "superAdmin":
            return superAdminRoutes
        case "technician":
            return technicianRoutes
        case "pending":
            return pending
    }
}