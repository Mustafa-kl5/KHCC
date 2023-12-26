
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
import { Permission } from "pages/superAdmin/Permission";
export const publicRoutes: iRoute[] = [
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/SignUp",
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
        path: "/add-samples/:patientId",
        element: <AddSamples />,
        pageName: "Add Samples",
        icon: <BorderColorIcon />,
        notShown: true
    },
];
export const superAdminRoutes: iRoute[] = [
    {
        path: "/",
        element: <Permission />,
        pageName: "Permission",
        icon: <PersonAddAltIcon />
    },
    {
        path: "/patient-list",
        element: <SignUp />,
        pageName: "patient list",
        icon: <PersonAddAltIcon />
    },
    {
        path: "/add-samples",
        element: <SignUp />,
        pageName: "Add Samples",
        icon: <PersonAddAltIcon />
    },
];
export const technicianRoutes: iRoute[] = [
    {
        path: "/add-patient",
        element: <Login />,
        pageName: "add patient",
        icon: <PersonAddAltIcon />
    },
    {
        path: "/patient-list",
        element: <SignUp />,
        pageName: "patient list",
        icon: <PersonAddAltIcon />
    },
    {
        path: "/add-samples",
        element: <SignUp />,
        pageName: "Add Samples",
        icon: <PersonAddAltIcon />
    },
];
export const pending: iRoute[] = [
    {
        path: "/",
        element: <NoPermission />,
        pageName: "No permission",
        icon: <PersonAddAltIcon />
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
        default:
            return []
    }
}