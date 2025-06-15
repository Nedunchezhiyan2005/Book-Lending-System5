// pages/catalog.js
import { useState, useEffect } from "react";
import BookSearch from "../components/BookSearch";

const bookList = [
  { title: "Digital Logic Design", author: "M. Morris Mano", category: "Engineering" },
  { title: "Introduction to Algorithms", author: "Cormen et al.", category: "Computer Science" },
  { title: "Atomic Habits", author: "James Clear", category: "Self-help" },
  { title: "Clean Code", author: "Robert C. Martin", category: "Programming" },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt", category: "Programming" },
  { title: "The Alchemist", author: "Paulo Coelho", category: "Fiction" },
  { title: "1984", author: "George Orwell", category: "Fiction" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Psychology" },
  { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science" },
  { title: "Sapiens", author: "Yuval Noah Harari", category: "History" },
  { title: "Deep Work", author: "Cal Newport", category: "Productivity" },
  { title: "Zero to One", author: "Peter Thiel", category: "Business" },
  { title: "Hooked", author: "Nir Eyal", category: "Marketing" },
  { title: "Don't Make Me Think", author: "Steve Krug", category: "UX Design" },
  { title: "The Lean Startup", author: "Eric Ries", category: "Business" },
  { title: "Design of Everyday Things", author: "Don Norman", category: "Design" },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Finance" },
  { title: "The 4-Hour Workweek", author: "Tim Ferriss", category: "Lifestyle" },
  { title: "The Psychology of Money", author: "Morgan Housel", category: "Finance" },
  { title: "Cracking the Coding Interview", author: "Gayle Laakmann McDowell", category: "Tech" }
];

export default function Catalog() {
  const [borrowed, setBorrowed] = useState([]);

  const handleBorrow = (title) => {
    if (!borrowed.includes(title)) {
      setBorrowed([...borrowed, title]);
    }
  };

  useEffect(() => {
    console.log("Books borrowed:", borrowed);
  }, [borrowed]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Library Catalog</h1>
     
      <BookSearch books={bookList} borrowedBooks={borrowed} onBorrow={handleBorrow} />
    </div>
  );
}