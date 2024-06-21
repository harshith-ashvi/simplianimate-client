import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import TextFlyers from "./pages/TextFlyers";
import MatrixRain from "./pages/MatrixRain";
import TextReveal from "./pages/TextReveal";
import Kotyadhipati from "./pages/Kotyadhipati";
import TextFalling from "./pages/TextFalling";
import TestDemos from "./pages/TestDemo";
import GradientArora from "./pages/GradientArora";
// import ImageFlyers from "./pages/ImageFlyers";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/text-flyers"
          element={
            <div className="md:h-screen-minus-45 max-md:h-screen-minus-70">
              <TextFlyers />
            </div>
          }
        />
        <Route
          path="/matrix-rain"
          element={
            <div className="md:h-screen-minus-45 max-md:h-screen-minus-70">
              <MatrixRain />
            </div>
          }
        />
        <Route
          path="/text-reveal"
          element={
            <div className="md:h-screen-minus-45 max-md:h-screen-minus-70">
              <TextReveal />
            </div>
          }
        />
        <Route
          path="/text-falling"
          element={
            <div className="md:h-screen-minus-45 max-md:h-screen-minus-70">
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
            <div className="md:h-screen-minus-45 max-md:h-screen-minus-70">
              <Kotyadhipati />
            </div>
          }
        />
        <Route
          path="/gradient-arora"
          element={
            <div className="md:h-screen-minus-45 max-md:h-screen-minus-70">
              <GradientArora />
            </div>
          }
        />
        <Route
          path="/test-demos"
          element={
            <div className="md:h-screen-minus-45 max-md:h-screen-minus-70">
              <TestDemos />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
