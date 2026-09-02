import { Link } from "react-router-dom"
import { useAuth } from "../context/useAuth"

function Dashboard() {
  const { user } = useAuth()

  const features = [
    {
      title: "Interviews",
      description: "Browse and share interview experiences",
      link: "/interviews",
      color: "bg-blue-600",
    },
    {
      title: "Companies",
      description: "Explore companies and their interview patterns",
      link: "/companies",
      color: "bg-emerald-600",
    },
    {
      title: "Questions",
      description: "Practice coding questions by company",
      link: "/questions",
      color: "bg-purple-600",
    },
    {
      title: "Bookmarks",
      description: "Your saved questions for quick access",
      link: "/bookmarks",
      color: "bg-amber-600",
    },
    {
      title: "Resume",
      description: "Upload and manage your resume",
      link: "/resume",
      color: "bg-rose-600",
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* Welcome section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold dark:text-gray-900">
          Welcome back, {user?.name || "User"} 👋
        </h1>
        <p className="mt-2 text-slate-400 dark:text-gray-500">
          Here's what you can do today
        </p>
      </div>

      {/* Quick profile card */}
      <div className="mb-10 rounded-xl border border-slate-800 bg-slate-900 p-6 dark:border-gray-200 dark:bg-white">
        <h2 className="text-lg font-semibold dark:text-gray-900">Your Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-slate-400 dark:text-gray-500">Name</p>
            <p className="font-medium dark:text-gray-900">{user?.name || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 dark:text-gray-500">Email</p>
            <p className="font-medium dark:text-gray-900">{user?.email || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 dark:text-gray-500">Role</p>
            <p className="font-medium capitalize dark:text-gray-900">{user?.role || "user"}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 dark:text-gray-500">Department</p>
            <p className="font-medium dark:text-gray-900">{user?.department || "—"}</p>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <h2 className="mb-6 text-xl font-semibold dark:text-gray-900">Quick Actions</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.link}
            className="group rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700 hover:bg-slate-800/50 dark:border-gray-200 dark:bg-white dark:hover:bg-gray-50"
          >
            <div className={`inline-flex rounded-lg p-2 ${feature.color}`}>
              <span className="text-white text-sm font-bold">
                {feature.title[0]}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-semibold dark:text-gray-900">
              {feature.title}
            </h3>
            <p className="mt-1 text-sm text-slate-400 dark:text-gray-500">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default Dashboard
