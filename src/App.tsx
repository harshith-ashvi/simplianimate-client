import "./App.css";

import { AuthProvider } from "./components/auth/Auth";

import AuthRoutes from "./routes/AuthRoutes";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div>
      <AuthProvider>
        <AuthRoutes />
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
