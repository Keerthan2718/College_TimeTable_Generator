import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-xl hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Timetable
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Dashboard
              </Link>

              <span className="font-medium">
                {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="hover:text-red-600 dark:hover:text-red-400 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          <ThemeToggle />

        </div>

      </div>

    </nav>
  );
}

export default Navbar;