import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import TextFlyers from "./pages/TextFlyers";
import MatrixRain from "./pages/MatrixRain";
import TextReveal from "./pages/TextReveal";
import Kotyadhipati from "./pages/Kotyadhipati";
import TextFalling from "./pages/textFalling";
import TestDemos from "./pages/TestDemo";
// import ImageFlyers from "./pages/ImageFlyers";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/text-flyers"
          element={
            <div style={{ height: "calc(100vh - 45px)" }}>
              <TextFlyers />
            </div>
          }
        />
        <Route
          path="/matrix-rain"
          element={
            <div style={{ height: "calc(100vh - 45px)" }}>
              <MatrixRain />
            </div>
          }
        />
        <Route
          path="/text-reveal"
          element={
            <div style={{ height: "calc(100vh - 45px)" }}>
              <TextReveal />
            </div>
          }
        />
        <Route
          path="/text-falling"
          element={
            <div style={{ height: "calc(100vh - 45px)" }}>
              <TextFalling />
            </div>
          }
        />
        {/* <Route
          path="/image-flyers"
          element={
            <div style={{ height: "calc(100vh - 45px)" }}>
              <ImageFlyers />
            </div>
          }
        /> */}
        <Route
          path="/quiz"
          element={
            <div style={{ height: "calc(100vh - 45px)" }}>
              <Kotyadhipati />
            </div>
          }
        />
        <Route
          path="/test-demos"
          element={
            <div style={{ height: "calc(100vh - 45px)" }}>
              <TestDemos />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
