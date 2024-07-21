import { LoginForm } from "Components/auth/LoginForm";
import { SignUpForm } from "Components/auth/SignUpForm";
import { createBrowserRouter } from "react-router-dom";
import Auth from "pages/auth/Auth";
import { AddStudy } from "pages/superAdmin/AddStudy";
import AdminDashboard from "pages/AdminDashboard";
import { AddFreezer } from "pages/superAdmin/AddFreezer";
import { ApproveStudies } from "pages/superAdmin/ApproveStudies";
import { Dashboard } from "pages/superAdmin/Dashboard";
import { Freezers } from "pages/superAdmin/Freezers";
import { Logs } from "pages/superAdmin/Logs";
import { Permission } from "pages/superAdmin/Permission";
import { Studies } from "pages/superAdmin/Studies";
import { Patients } from "pages/technician/Patients";
import TechnicianDashboard from "pages/TechnicianDashboard";
import { SamplesList } from "pages/technician/SamplesList";
import ExportSamples from "pages/technician/ExportSamples";
import ExportedSampleBackUp from "pages/technician/ExportedSampleBackUp";
import { Storage } from "pages/technician/Storage";
import NursingDashboard from "pages/NursingDashboard";
import { PatientList } from "pages/nursing/PatientList";
import { AddSamples } from "pages/nursing/AddSamples";
import { AddPatient } from "pages/nursing/AddPatient";
import ErrorBoundary from "pages/ErrorBoundary";
import AuthGuard from "Components/auth/AuthGuard";

export const router = createBrowserRouter([
  {
    element: <Auth />,
    children: [
      {
        path: "sign-up",
        element: <SignUpForm />,
      },
      { path: "/", element: <LoginForm />, index: true },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <AuthGuard role="superAdmin">
        <AdminDashboard />
      </AuthGuard>
    ),
    children: [
      { path: "add-study", element: <AddStudy /> },
      { path: "add-freezer", element: <AddFreezer /> },
      { path: "approve-studies", element: <ApproveStudies /> },
      { path: "charts", element: <Dashboard /> },
      { path: "freezer", element: <Freezers /> },
      { path: "logs", element: <Logs /> },
      { path: "permission", element: <Permission /> },
      { path: "studies", element: <Studies /> },
    ],
  },
  {
    path: "/technician-dashboard",
    element: (
      <AuthGuard role="technician">
        <TechnicianDashboard />
      </AuthGuard>
    ),
    children: [
      { path: "patients", element: <Patients /> },
      { path: "sample-list", element: <SamplesList /> },
      { path: "exported-samples", element: <ExportSamples /> },
      { path: "exported-samples-back-up", element: <ExportedSampleBackUp /> },
      { path: "storage", element: <Storage /> },
      { path: "add-study", element: <AddStudy /> },
    ],
  },
  {
    path: "/nursing-dashboard",
    element: (
      <AuthGuard role="nursing">
        <NursingDashboard />
      </AuthGuard>
    ),

    children: [
      { path: "patients", element: <PatientList /> },
      { path: "add-sample/:patientId", element: <AddSamples /> },
      { path: "add-patient", element: <AddPatient /> },
      { path: "add-study", element: <AddStudy /> },
    ],
  },
  { path: "*", element: <ErrorBoundary /> },
]);
