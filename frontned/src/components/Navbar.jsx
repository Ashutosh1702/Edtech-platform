import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full text-white fixed top-0 left-0 z-40">
      <div className="backdrop-blur-sm bg-[linear-gradient(90deg,rgba(14,24,39,0.6),rgba(8,10,20,0.35))] border-b border-white/6">
        <div className="container-max flex items-center justify-between py-3">
          {/* Logo + badge */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-xl flex items-center justify-center text-white font-bold">
                E
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-extrabold">MyEdTech</div>
                <div className="text-xs muted">Learn. Build. Succeed.</div>
              </div>
            </Link>
            <span className="hidden md:inline-flex items-center px-3 py-1 text-xs bg-white/6 rounded-full border border-white/6 text-blue-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2"/></svg>
              Winter cohort open
            </span>
          </div>

          {/* Center nav + search */}
          <div className="flex-1 px-6 hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6">
              <NavLink to="/courses" className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-white underline decoration-2 underline-offset-4' : 'text-slate-300 hover:text-white'}`}>
                Courses
              </NavLink>
              <NavLink to="/syllabus" className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-white underline decoration-2 underline-offset-4' : 'text-slate-300 hover:text-white'}`}>
                Syllabus
              </NavLink>
              <NavLink to="/online-test" className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-white underline decoration-2 underline-offset-4' : 'text-slate-300 hover:text-white'}`}>
                Tests
              </NavLink>
            </div>

            <div className="flex-1">
              <div className="relative">
                <input
                  aria-label="Search courses"
                  placeholder="Search courses, topics, mentors..."
                  className="w-full bg-white/6 text-sm text-white placeholder:muted py-2 px-4 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full text-white text-sm">Search</button>
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <div className="text-sm muted">Hi, {user.name}</div>
                  <button onClick={logout} className="text-sm px-3 py-1 rounded-md transition bg-white/6 hover:bg-white/10 text-white">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm muted hover:text-white transition">Login</Link>
                  <Link to="/register" className="btn-primary">Sign up</Link>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 rounded-md bg-white/6" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden px-4 pb-4">
            <div className="flex flex-col gap-3">
              <NavLink to="/courses" className={({ isActive }) => `py-2 px-3 rounded-md ${isActive ? 'bg-white/6 text-white' : 'text-slate-300 hover:bg-white/4'}`} onClick={() => setOpen(false)}>Courses</NavLink>
              <NavLink to="/syllabus" className={({ isActive }) => `py-2 px-3 rounded-md ${isActive ? 'bg-white/6 text-white' : 'text-slate-300 hover:bg-white/4'}`} onClick={() => setOpen(false)}>Syllabus</NavLink>
              <NavLink to="/online-test" className={({ isActive }) => `py-2 px-3 rounded-md ${isActive ? 'bg-white/6 text-white' : 'text-slate-300 hover:bg-white/4'}`} onClick={() => setOpen(false)}>Tests</NavLink>
              <div className="pt-2 border-t border-white/6 flex gap-2">
                {user ? (
                  <button onClick={logout} className="flex-1 btn-primary">Logout</button>
                ) : (
                  <>
                    <Link to="/login" className="flex-1 py-2 text-center rounded-md bg-transparent border border-white/6">Login</Link>
                    <Link to="/register" className="flex-1 btn-primary text-center">Sign up</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
