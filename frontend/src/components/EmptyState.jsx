function EmptyState({ message = "No data found", actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <p className="text-6xl">📭</p>
      <p className="mt-4 text-lg text-slate-400 dark:text-gray-500">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
export default EmptyState