import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
// import UserRegistration from "./Components/UserRegistration";
import GameManagement from "./Components/GameManagement";
import { GamesProvider } from "./Components/GamesContext";
import "./App.css";

const App: React.FC = () => {
  return (
    <GamesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/login" element={<UserRegistration />} /> */}

          <Route path="/management" element={<GameManagement />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </GamesProvider>
  );
};

export default App;
