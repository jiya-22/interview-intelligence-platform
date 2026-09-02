function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 disabled:opacity-50 dark:border-gray-300 dark:text-gray-600 dark:hover:bg-gray-100"
      >
        ← Prev
      </button>

      {/* Page number buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-lg px-3 py-2 text-sm font-medium ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "border border-slate-700 text-slate-300 hover:bg-slate-800 dark:border-gray-300 dark:text-gray-600"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 disabled:opacity-50 dark:border-gray-300 dark:text-gray-600 dark:hover:bg-gray-100"
      >
        Next →
      </button>
    </div>
  )
}
export default Pagination