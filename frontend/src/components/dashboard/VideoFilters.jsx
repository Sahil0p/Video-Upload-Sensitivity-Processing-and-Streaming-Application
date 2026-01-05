export default function VideoFilters({ filter, setFilter }) {
    const filters = ["all", "safe", "flagged", "processing"];
  
    return (
      <div className="flex gap-2 mb-6">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            // className={`px-4 py-1 rounded-full text-sm border transition
            //   ${
            //     filter === f
            //       ? "bg-blue-600 text-white border-blue-600"
            //       : "bg-white text-gray-600 hover:bg-gray-100"
            //   }`}
            className={`filter-pill ${
  filter === f ? "filter-pill-active" : ""
}`}

          >
            {f}
          </button>
        ))}
      </div>
    );
  }
  