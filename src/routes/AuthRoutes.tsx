import { Route, Routes } from "react-router-dom";

import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Signin from "@/pages/Auth/Signin";
import Signup from "@/pages/Auth/Signup";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default AuthRoutes;
