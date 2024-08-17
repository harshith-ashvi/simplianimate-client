import { Navigate } from "react-router-dom";

import { useAuth } from "@/components/auth/Auth";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }

  return <div className="">{children}</div>;
};

export default DashboardLayout;
