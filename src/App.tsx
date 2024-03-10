import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import TextFlyers from "./pages/TextFlyers";

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
      </Routes>
    </div>
  );
}

export default App;
