import { AuthLayout } from "UI/AuthLayout";
import React from "react";
import { Outlet } from "react-router-dom";
const Auth = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export default Auth;
