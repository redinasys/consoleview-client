import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const isLoggeIn = localStorage.getItem("access-token");

  return isLoggeIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;