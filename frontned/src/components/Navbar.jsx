import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight">
          My<span className="text-blue-400">EdTech</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link
            to="/courses"
            className="text-sm font-medium hover:text-blue-300 transition"
          >
            Courses
          </Link>

          {user ? (
            <>
              <span className="text-sm">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm hover:text-blue-300 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
