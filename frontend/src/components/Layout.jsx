import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white dark:bg-gray-50 dark:text-gray-900">
      <Navbar />
      <main>
        <Outlet />   {/* Child page renders here */}
      </main>
      <Footer />
    </div>
  )
}
export default Layout