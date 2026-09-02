function FilterBar({ filters, activeFilters, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <select
          key={filter.name}
          value={activeFilters[filter.name] || ""}
          onChange={(e) => onFilterChange(filter.name, e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none dark:border-gray-300 dark:bg-gray-100 dark:text-gray-900"
        >
          <option value="">{filter.label}</option>
          {filter.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ))}
    </div>
  )
}
export default FilterBar
