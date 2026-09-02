import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import apiRequest from "../services/api"

function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (name.length < 3) {
      setError("Name must be at least 3 characters")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsSubmitting(true)
    try {
      await apiRequest("/api/v1/users", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      })
      navigate("/login", { state: { success: "Account created! Please login." } })
    } catch (err) {
      setError(err.message || "Registration failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8 dark:border-gray-200 dark:bg-white">

        <h1 className="text-2xl font-bold dark:text-gray-900">Create Account</h1>
        <p className="mt-2 text-slate-400 dark:text-gray-500">Start your interview preparation journey</p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 dark:text-gray-700">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none dark:border-gray-300 dark:bg-gray-100 dark:text-gray-900"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 dark:text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none dark:border-gray-300 dark:bg-gray-100 dark:text-gray-900"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 dark:text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none dark:border-gray-300 dark:bg-gray-100 dark:text-gray-900"
              placeholder="Min 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400 dark:text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>

      </div>
    </div>
  )
}

export default Register