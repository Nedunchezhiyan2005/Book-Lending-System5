// components/BookSearch.js
import { useState } from "react";

export default function BookSearch({ books, borrowedBooks, onBorrow }) {
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const highlightText = (text) => {
    if (!search) return text;
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200">{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="p-6 bg-indigo-50">
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Search by book title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredBooks.map((book, index) => (
          <div key={index} className="border rounded p-4 text-center shadow bg-white">
            <h3 className="font-semibold">{highlightText(book.title)}</h3>
            <p className="text-sm">{book.author}</p>
            <span className="text-xs inline-block mt-2 mb-4 bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {book.category}
            </span>
            <button
              onClick={() => onBorrow(book.title)}
              disabled={borrowedBooks.includes(book.title)}
              className={`block w-full ${
                borrowedBooks.includes(book.title)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white py-1 rounded`}
            >
              {borrowedBooks.includes(book.title) ? "Borrowed" : "Borrow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
