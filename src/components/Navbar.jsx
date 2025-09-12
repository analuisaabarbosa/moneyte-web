import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800/50 p-4 text-white shadow-md backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          moneyte
        </Link>
        <div className="flex items-center space-x-4">
          <span>Olá, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-3 py-1 text-sm font-medium hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
