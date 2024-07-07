import { Route, Routes } from "react-router-dom";

import TemplateScreen from "@/layouts/TemplateScreen";
import { useAuth } from "@/components/auth/Auth";

import Home from "@/pages/Home";

import TextFlyers from "@/pages/TextFlyers";
import MatrixRain from "@/pages/MatrixRain";
import TextReveal from "@/pages/TextReveal";
import TextFalling from "@/pages/TextFalling";

import Kotyadhipati from "@/pages/Kotyadhipati";
import GradientArora from "@/pages/GradientArora";

import TestDemos from "@/pages/TestDemo";

const AppRoutes = () => {
  const { user } = useAuth();

  if (!user) return;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <TemplateScreen>
            <Home />
          </TemplateScreen>
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
        path="/test-demos"
        element={
          <TemplateScreen>
            <TestDemos />
          </TemplateScreen>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
