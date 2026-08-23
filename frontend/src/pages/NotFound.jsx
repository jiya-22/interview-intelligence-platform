import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h1 className="text-6xl font-bold text-blue-500">404</h1>
      <p className="mt-4 text-xl text-slate-400">Page not found</p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound