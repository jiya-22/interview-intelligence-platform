function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none dark:border-gray-300 dark:bg-gray-100 dark:text-gray-900"
      />
    </div>
  )
}
export default SearchBar