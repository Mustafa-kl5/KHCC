import {
  AddCircleSharp,
  Approval,
  Backup,
  BookOutlined,
  CallToAction,
  Dashboard,
  ImportContacts,
  ImportExport,
  List,
  Pattern,
  PermScanWifiSharp,
  SevereCold,
  Storage,
} from "@mui/icons-material";
import { Header } from "Components/Header/Header";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { USER_ROLE } from "utils/constant";

interface iPath {
  path: string;
  name: string;
  icon: React.ReactNode;
}

const adminPaths: iPath[] = [
  {
    path: "/admin-dashboard/charts",
    name: "Dashboard",
    icon: <Dashboard />,
  },
  {
    path: "/admin-dashboard/add-study",
    name: "Add Study",
    icon: <ImportContacts />,
  },
  {
    path: "/admin-dashboard/studies",
    name: "Studies",
    icon: <BookOutlined />,
  },
  {
    path: "/admin-dashboard/add-freezer",
    name: "Add Freezer",
    icon: <AddCircleSharp />,
  },
  {
    path: "/admin-dashboard/approve-studies",
    name: "Approve Studies",
    icon: <Approval />,
  },
  {
    path: "/admin-dashboard/freezer",
    name: "Freezers",
    icon: <SevereCold />,
  },
  {
    path: "/admin-dashboard/logs",
    name: "Logs",
    icon: <CallToAction />,
  },
  {
    path: "/admin-dashboard/permission",
    name: "Permission",
    icon: <PermScanWifiSharp />,
  },
  {
    path: "/admin-dashboard/forget-password",
    name: "Forget Password",
    icon: <PermScanWifiSharp />,
  },
];
const technicianPaths: iPath[] = [
  {
    path: "/technician-dashboard/patients",
    name: "Patients",
    icon: <Pattern />,
  },
  {
    path: "/technician-dashboard/sample-list",
    name: "Sample List",
    icon: <List />,
  },
  {
    path: "/technician-dashboard/storage",
    name: "Storage",
    icon: <Storage />,
  },
  {
    path: "/technician-dashboard/exported-samples",
    name: "Exported Samples",
    icon: <ImportExport />,
  },
  {
    path: "/technician-dashboard/exported-samples-back-up",
    name: "Exported Samples Back Up",
    icon: <Backup />,
  },
  {
    path: "/technician-dashboard/add-study",
    name: "Add Study",
    icon: <ImportContacts />,
  },
  {
    path: "/technician-dashboard/forget-password",
    name: "Forget Password",
    icon: <PermScanWifiSharp />,
  },
];
const nursingPaths: iPath[] = [
  {
    path: "/nursing-dashboard/patients",
    name: "Patients",
    icon: <Pattern />,
  },
  {
    path: "/nursing-dashboard/add-patient",
    name: "Add Patient",
    icon: <AddCircleSharp />,
  },
  {
    path: "/nursing-dashboard/add-study",
    name: "Add Study",
    icon: <ImportContacts />,
  },
  {
    path: "/nursing-dashboard/forget-password",
    name: "Forget Password",
    icon: <PermScanWifiSharp />,
  },
];
export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [paths, setPaths] = useState<iPath[]>(adminPaths);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    switch (localStorage.getItem(USER_ROLE)) {
      case "superAdmin":
        setPaths(adminPaths);
        break;
      case "technician":
        setPaths(technicianPaths);
        break;
      case "nursing":
        setPaths(nursingPaths);
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="h-full flex flex-col w-full gap-3 bg-hussein-100">
      <div className="sticky top-0">
        <Header />
      </div>
      <div className=" w-full h-full relative">
        <div className="w-[82%] h-full py-8 px-4 absolute bg-white left-[17%]">
          {children}
        </div>
        <div className="w-[16%] h-full bg-white flex flex-col">
          {paths.map((path) => {
            return (
              <div
                key={path.path}
                onClick={() => {
                  navigate(path.path);
                }}
                className={`w-full flex gap-2 p-4 cursor-pointer hover:bg-hussein-100 ${
                  location.pathname === path.path ? "bg-hussein-100" : ""
                }`}
              >
                {path.icon}
                <span className="text-lg hidden xl:flex">{path.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pb-3 px-4">
        © Mustafa Mahmood 2024. All rights reserved.
        <a
          href="mailto:mustafaalowisi@gmail.com"
          className="underline text-blue-700"
        >
          Email
        </a>
      </div>
    </div>
  );
};
