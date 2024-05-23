import { MainLayout } from "UI/MainLayout";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default AdminDashboard;
