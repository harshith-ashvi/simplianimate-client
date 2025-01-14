import { Route, Routes } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";

import Home from "@/pages/Home";

import TextFlyers from "@/pages/TextFlyers";
import MatrixRain from "@/pages/MatrixRain";
import TextReveal from "@/pages/TextReveal";
import TextFalling from "@/pages/TextFalling";

import ASCII from "@/pages/ASCII";
import PixelEffect from "@/pages/PixelEffect";
import DisplacementMap from "@/pages/DisplacementMap";
import ComicEffect from "@/pages/ComicEffect";

import Kotyadhipati from "@/pages/Kotyadhipati";
import GradientArora from "@/pages/GradientArora";

import TestDemos from "@/pages/TestDemo";
import RecoverPassword from "@/pages/Auth/RecoverPassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/reset-password" element={<RecoverPassword />} />
      <Route
        path="/dashboard"
        element={
          <DashboardLayout isTemplate={false}>
            <Home />
          </DashboardLayout>
        }
      />
      <Route
        path="/text-flyers"
        element={
          <DashboardLayout>
            <TextFlyers />
          </DashboardLayout>
        }
      />
      <Route
        path="/matrix-rain"
        element={
          <DashboardLayout>
            <MatrixRain />
          </DashboardLayout>
        }
      />
      <Route
        path="/text-reveal"
        element={
          <DashboardLayout>
            <TextReveal />
          </DashboardLayout>
        }
      />
      <Route
        path="/text-falling"
        element={
          <DashboardLayout>
            <TextFalling />
          </DashboardLayout>
        }
      />
      <Route
        path="/quiz"
        element={
          <DashboardLayout>
            <Kotyadhipati />
          </DashboardLayout>
        }
      />
      <Route
        path="/gradient-arora"
        element={
          <DashboardLayout>
            <GradientArora />
          </DashboardLayout>
        }
      />
      <Route
        path="/ascii-art"
        element={
          <DashboardLayout>
            <ASCII />
          </DashboardLayout>
        }
      />
      <Route
        path="/pixel-art"
        element={
          <DashboardLayout>
            <PixelEffect />
          </DashboardLayout>
        }
      />
      <Route
        path="/displacement-map"
        element={
          <DashboardLayout>
            <DisplacementMap />
          </DashboardLayout>
        }
      />
      <Route
        path="/comic-effect"
        element={
          <DashboardLayout>
            <ComicEffect />
          </DashboardLayout>
        }
      />
      <Route
        path="/test-demos"
        element={
          <DashboardLayout>
            <TestDemos />
          </DashboardLayout>
        }
      />
      <Route path="/" element={<Home />} />
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};

export default AppRoutes;
