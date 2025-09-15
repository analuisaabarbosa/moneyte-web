import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const LogoutIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  return (
    <header className="bg-gray-800/50 py-4 text-white shadow-md backdrop-blur-md">
      <nav
        className="container mx-auto px-11 flex items-center justify-between"
        aria-label="Menu principal"
      >
        <Link to="/" className="text-lg font-semibold">
          moneyte
        </Link>
        <div className="flex">
          <ul>
            <li>
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 p-2 text-sm font-medium hover:bg-red-700"
              >
                <LogoutIcon />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
