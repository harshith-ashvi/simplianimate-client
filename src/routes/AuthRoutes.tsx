import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "@/components/auth/Auth";

import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Signin from "@/pages/Auth/Signin";
import Signup from "@/pages/Auth/Signup";

const AuthRoutes = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default AuthRoutes;
