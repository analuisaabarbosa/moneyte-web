import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Background from "./components/Background";

function App() {
  return (
    <BrowserRouter>
      <Background />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
