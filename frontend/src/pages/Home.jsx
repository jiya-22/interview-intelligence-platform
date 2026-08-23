import { Link } from "react-router-dom"

function Home() {
  return (
    <div> 
      {/* Hero Section */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">

        <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
          Prepare Smarter.
          <span className="text-blue-500"> Interview Better.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          An intelligent interview preparation platform that helps you
          practice coding questions, improve your resume, and prepare
          for real technical interviews.
        </p>

        <div className="mt-8 flex gap-4">

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-300 hover:bg-slate-800"
          >
            Login
          </Link>

        </div>

      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 pb-24">

        <h2 className="text-center text-3xl font-bold">
          Everything you need to prepare
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold">
              Coding Practice
            </h3>

            <p className="mt-3 text-slate-400">
              Practice interview questions and improve your
              problem-solving skills.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold">
              Resume Analysis
            </h3>

            <p className="mt-3 text-slate-400">
              Upload your resume and receive intelligent feedback
              to improve it.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold">
              Interview Preparation
            </h3>

            <p className="mt-3 text-slate-400">
              Prepare for technical interviews with company-specific
              questions and practice.
            </p>
          </div>

        </div>

      </section>

    </div>
  )
}

export default Home