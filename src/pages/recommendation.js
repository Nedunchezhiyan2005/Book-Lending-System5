import { useState } from "react";

export default function recommendation() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGeminiSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a topic to search.");
      return;
    }

    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await fetch("/api/askGemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Suggest library books related to: ${query}` }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gemini API request failed");
      }

      setResult(data.result || "No response from Gemini.");
    } catch (err) {
      console.error("Gemini fetch error:", err);
      setError(err.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12 font-sans flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">
          📚 Library Assistant <span className="text-sm text-gray-500">(powered by Gemini)</span>
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="e.g., Machine Learning"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            onClick={handleGeminiSearch}
            disabled={loading}
            className={`w-full py-3 text-white rounded-md transition ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Searching..." : "Ask Gemini"}
          </button>
        </div>

        {error && (
          <div className="mt-4 text-red-600 font-medium bg-red-100 px-4 py-2 rounded">
            ❗ {error}
          </div>
        )}

        {result && (
          <div className="mt-6 bg-gray-50 border border-gray-200 p-4 rounded-md">
            <h3 className="font-semibold text-gray-700 mb-2">📖 Gemini Suggests:</h3>
            <pre className="whitespace-pre-wrap text-gray-800">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
