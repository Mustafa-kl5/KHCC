import React from "react";
import khccLogo from "../../assets/Images/khcc-logo.png";
import khccBioLogo from "../../assets/Images/khccbio-logo.jpg";

import { Button } from "@mui/material";
import { Logout, isLoggedIn } from "services/authService";
import { useNavigate } from "react-router-dom";
export const Header = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-hussein-200 w-full p-3 px-5 flex justify-between rounded-xl items-center shadow-lg">
      {children && children}
      <div className="flex gap-2">
        <img src={khccBioLogo} alt="KHCCbio-logo" className="h-9" />
        <img src={khccLogo} alt="KHCC-logo" className="h-9" />
      </div>
      {isLoggedIn() ? (
        <Button
          onClick={() => {
            Logout(navigate);
          }}
          variant="contained"
          className="rounded-2xl"
          color="error"
        >
          Logout
        </Button>
      ) : (
        <span></span>
      )}
    </div>
  );
};
