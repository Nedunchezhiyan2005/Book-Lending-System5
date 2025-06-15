"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "books"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBooks(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 p-4">
      {books.map((book) => (
        <div key={book.id} className="border rounded p-2 shadow-sm">
          <img src={book.coverUrl} alt={book.title} className="w-full h-40 object-cover mb-2" />
          <p className="font-semibold text-center">{book.title}</p>
        </div>
      ))}
    </div>
  );
}
