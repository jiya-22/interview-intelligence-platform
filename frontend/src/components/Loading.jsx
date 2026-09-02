function Loading({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>
      <p className="mt-4 text-slate-400 dark:text-gray-500">{message}</p>
    </div>
  )
}
export default Loading