import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"

function Navbar() {
  const { user, token, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  function isActive(path) {
    return location.pathname === path
      ? "text-white border-b-2 border-blue-500"
      : "text-slate-300 hover:text-white"
  }

  function handleLogout() {
    logout()
    setIsOpen(false)
  }

  function closeMobile() {
    setIsOpen(false)
  }

  return (
    <nav className="border-b border-slate-800 bg-slate-950 dark:border-gray-200 dark:bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-white dark:text-gray-900">
          Interview Intelligence
        </Link>

        {/* Desktop links — hidden on mobile */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className={isActive("/")}>Home</Link>

          {token ? (
            <>
              <Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
              <Link to="/bookmarks" className={isActive("/bookmarks")}>Bookmarks</Link>
              <Link to="/notifications" className={isActive("/notifications")}>Notifications</Link>
            </>
          ) : (
            <>
              <Link to="/login" className={isActive("/login")}>Login</Link>
              <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">Register</Link>
            </>
          )}

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="text-slate-300 hover:text-white dark:text-gray-600 dark:hover:text-gray-900">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {token && (
            <button onClick={handleLogout} className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800 dark:border-gray-300 dark:text-gray-600 dark:hover:bg-gray-100">
              Logout
            </button>
          )}
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className="text-slate-300 hover:text-white dark:text-gray-600">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white dark:text-gray-600">
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-950 dark:border-gray-200 dark:bg-white md:hidden">
          <div className="flex flex-col gap-4 px-6 py-4">
            <Link to="/" onClick={closeMobile} className={isActive("/")}>Home</Link>

            {token ? (
              <>
                <Link to="/dashboard" onClick={closeMobile} className={isActive("/dashboard")}>Dashboard</Link>
                <Link to="/bookmarks" onClick={closeMobile} className={isActive("/bookmarks")}>Bookmarks</Link>
                <Link to="/notifications" onClick={closeMobile} className={isActive("/notifications")}>Notifications</Link>
                <hr className="border-slate-800 dark:border-gray-200" />
                <button onClick={handleLogout} className="text-left text-slate-300 hover:text-white dark:text-gray-600">Logout</button>
              </>
            ) : (
              <>
                <hr className="border-slate-800 dark:border-gray-200" />
                <Link to="/login" onClick={closeMobile} className={isActive("/login")}>Login</Link>
                <Link to="/register" onClick={closeMobile} className="rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white hover:bg-blue-700">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar