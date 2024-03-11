import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import TextFlyers from "./pages/TextFlyers";
import TextReveal from "./pages/TextReveal";

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
          path="/text-reveal"
          element={
            <div style={{ height: "calc(100vh - 45px)" }}>
              <TextReveal />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
