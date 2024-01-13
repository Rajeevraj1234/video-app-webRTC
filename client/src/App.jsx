import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "../src/assets/landingPage"
import Room from "../src/assets/room"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="room/:roomId" element={<Room />} />
    </Routes>
  );
}

export default App;
