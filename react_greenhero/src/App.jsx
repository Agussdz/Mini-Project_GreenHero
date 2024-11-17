import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import "preline/preline";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AllSharing from "./components/AllSharing";
import CreateSharing from "./components/CreateSharing";
import GreenAI from "./components/GreenAI";
import CreateModul from "./components/CreateModul";
import PlantDetail from "./components/PlantDetail";
import Tanaman from "./components/Tanaman";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/plant/:id" element={<PlantDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allsharing" element={<AllSharing />} />
        <Route path="/tanaman" element={<Tanaman />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/createsharing" element={<CreateSharing />} />
          <Route path="/greenai" element={<GreenAI />} />
          <Route path="/createmodul" element={<CreateModul />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
