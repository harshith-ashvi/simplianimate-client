import { Navigate, Route, Routes } from "react-router-dom";

import TemplateScreen from "@/layouts/TemplateScreen";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useAuth } from "@/components/auth/Auth";

import Home from "@/pages/Home";

import TextFlyers from "@/pages/TextFlyers";
import MatrixRain from "@/pages/MatrixRain";
import TextReveal from "@/pages/TextReveal";
import TextFalling from "@/pages/TextFalling";

import ASCII from "@/pages/ASCI";

import Kotyadhipati from "@/pages/Kotyadhipati";
import GradientArora from "@/pages/GradientArora";

import TestDemos from "@/pages/TestDemo";
import RecoverPassword from "@/pages/Auth/RecoverPassword";

const AppRoutes = () => {
  const { user } = useAuth();

  if (!user) return;

  return (
    <Routes>
      <Route path="/reset-password" element={<RecoverPassword />} />
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Home />
          </DashboardLayout>
        }
      />
      <Route
        path="/text-flyers"
        element={
          <TemplateScreen>
            <TextFlyers />
          </TemplateScreen>
        }
      />
      <Route
        path="/matrix-rain"
        element={
          <TemplateScreen>
            <MatrixRain />
          </TemplateScreen>
        }
      />
      <Route
        path="/text-reveal"
        element={
          <TemplateScreen>
            <TextReveal />
          </TemplateScreen>
        }
      />
      <Route
        path="/text-falling"
        element={
          <TemplateScreen>
            <TextFalling />
          </TemplateScreen>
        }
      />
      <Route
        path="/quiz"
        element={
          <TemplateScreen>
            <Kotyadhipati />
          </TemplateScreen>
        }
      />
      <Route
        path="/gradient-arora"
        element={
          <TemplateScreen>
            <GradientArora />
          </TemplateScreen>
        }
      />
      <Route
        path="/ascii-art"
        element={
          <TemplateScreen>
            <ASCII />
          </TemplateScreen>
        }
      />
      <Route
        path="/test-demos"
        element={
          <TemplateScreen>
            <TestDemos />
          </TemplateScreen>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
