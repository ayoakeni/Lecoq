import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return ( 
      <div className="loaderBox">
        <span className="loader"></span>
      </div>
    );
  }

  return user ? children : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
