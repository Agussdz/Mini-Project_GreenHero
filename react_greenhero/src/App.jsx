import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AllSharing from "./components/AllSharing";
import CreateSharing from "./components/CreateSharing";
import GreenAI from "./components/GreenAI";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/createsharing"
          element={
            <ProtectedRoute>
              <CreateSharing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/greenai"
          element={
            <ProtectedRoute>
              <GreenAI />
            </ProtectedRoute>
          }
        />
        <Route path="/allsharing" element={<AllSharing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
