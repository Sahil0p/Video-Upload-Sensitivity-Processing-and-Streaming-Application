export default function SearchBar({ query, setQuery }) {
    return (
      <input
        placeholder="Search videos…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full md:w-64 mb-4"
      />
    );
  }
  