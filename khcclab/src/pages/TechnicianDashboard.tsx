import { MainLayout } from "UI/MainLayout";
import { Outlet } from "react-router-dom";

const TechnicianDashboard = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default TechnicianDashboard;
