import { MainLayout } from "UI/MainLayout";
import { Outlet } from "react-router-dom";

const NursingDashboard = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default NursingDashboard;
