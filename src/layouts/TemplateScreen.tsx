import { Navigate } from "react-router-dom";

import { useAuth } from "@/components/auth/Auth";

const TemplateScreen = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }

  return (
    <div className="md:h-screen-minus-45 max-md:h-screen-minus-70">
      {children}
    </div>
  );
};

export default TemplateScreen;
