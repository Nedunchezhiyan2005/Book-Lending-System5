import { useState } from 'react';

export default function SmartSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    setLoading(true);
    setResults([]);
    setError("");

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        setError("Server returned an error. Check logs for details.");
        return;
      }

      const data = await res.json();
      const lines = data.result?.split("\n").filter((line) => line.trim() !== "");
      const books = lines.map(line => {
        const match = line.match(/^\d*\.?\s*(.+?)\s+by\s+(.+)$/i);
        if (match) {
            return { title: match[1], author: match[2] };
        } else {
            return { title: line, author: "Unknown" };
        }
      });

        setResults(books);

    } catch (err) {
      console.error("Failed to fetch recommendations:", err);
      setError("Failed to get recommendations. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-white shadow rounded max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Smart Book Recommendations</h2>
      <input
        type="text"
        placeholder="e.g., suggest books on productivity"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={fetchRecommendations}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Searching..." : "Get Recommendations"}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {results.length > 0 && (
  <ul className="mt-4 space-y-2">
    {results.map((book, index) => (
      <li key={index} className="p-3 border rounded shadow-sm bg-gray-50">
        <strong className="text-lg">{book.title}</strong>
        <div className="text-sm text-gray-600">by {book.author}</div>
      </li>
    ))}
  </ul>
)}

    </div>
  );
}
