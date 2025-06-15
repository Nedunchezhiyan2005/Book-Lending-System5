import Link from "next/link";
import { useState } from "react";

import UserStatus from "../components/UserStatus";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">📚 Library Management System</h1>
        <nav className="space-x-4 mt-4 sm:mt-0">
          <a href="#" className="hover:underline">Home</a>
          <a href="#login-section" className="hover:underline">Login</a>
          <a href="#catalog" className="hover:underline">Catalog</a>
          <a href="#recommend" className="hover:underline">Recommendation</a>
        </nav>
      </header>

      {/* Intro Section */}
      <section className="p-10 text-center bg-blue-50">
        <h2 className="text-3xl font-semibold mb-4">Welcome to SmartLibrary</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Manage your library access with ease. Whether you're a student, librarian, or admin, our system helps you find, borrow, and organize books effortlessly.
        </p>
        <a href="#login-section" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Get Started
        </a>
      </section>

      {/* User Status Component */}
      <section className="p-10 bg-purple-50">
        <UserStatus />
      </section>

      {/* Login Section */}
      <section id="login-section" className="p-10 bg-gray-50">
        <form onSubmit={handleLogin} className="max-w-md mx-auto shadow-md p-8 rounded border bg-white">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          <input className="w-full p-2 mb-4 border rounded" type="text" placeholder="Enter your name" required />
          <input className="w-full p-2 mb-4 border rounded" type="email" placeholder="Enter your email" required />
          <input
            className="w-full p-2 mb-2 border rounded"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
          />
          <span className="text-sm text-blue-600 cursor-pointer mb-4 inline-block" onClick={togglePassword}>
            {showPassword ? "Hide Password" : "Show Password"}
          </span>
          <select className="w-full p-2 mb-4 border rounded" required>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="librarian">Librarian</option>
            <option value="admin">Admin</option>
          </select>
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" type="submit">
            Login
          </button>
          <p className="text-center text-sm mt-4">
            Don’t have an account? <Link href="/signup" className="text-blue-600 underline">Sign Up</Link>
          </p>
        </form>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="p-10 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4 text-center">Explore Our Catalog</h2>
        <p className="text-center mb-8">Browse our library's curated collection of books and resources.</p>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* Book Card 1 */}
          <div className="border rounded p-4 text-center shadow bg-white">
            <img src="/Book1.jpg" alt="Book Cover" className="h-40 mx-auto mb-4 object-contain" />
            <h3 className="font-semibold">Digital Logic Design</h3>
            <p className="text-sm">by M. Morris Mano</p>
            <span className="text-xs inline-block mt-2 mb-4 bg-blue-100 text-blue-700 px-2 py-1 rounded">Engineering</span>
            <Link href="/catalog">
              <button className="block w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700">Borrow</button>
            </Link>
          </div>
          {/* Book Card 2 */}
          <div className="border rounded p-4 text-center shadow bg-white">
            <img src="/Book2.jpeg" alt="Book Cover" className="h-40 mx-auto mb-4 object-contain" />
            <h3 className="font-semibold">Introduction to Algorithms</h3>
            <p className="text-sm">by Cormen et al.</p>
            <span className="text-xs inline-block mt-2 mb-4 bg-green-100 text-green-700 px-2 py-1 rounded">Computer Science</span>
            <Link href="/catalog">
              <button className="block w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700">Borrow</button>
            </Link>
          </div>
          {/* Book Card 3 */}
          <div className="border rounded p-4 text-center shadow bg-white">
            <img src="/Book3.jpg" alt="Book Cover" className="h-40 mx-auto mb-4 object-contain" />
            <h3 className="font-semibold">Atomic Habits</h3>
            <p className="text-sm">by James Clear</p>
            <span className="text-xs inline-block mt-2 mb-4 bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Self-help</span>
            <Link href="/catalog">
              <button className="block w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700">Borrow</button>
            </Link>
          </div>
        </div>

        

        {/* Link to full catalog.js page */}
        <div className="text-center mt-6">
          <Link href="/catalog">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              View Full Catalog
            </button>
          </Link>
        </div>
      </section>

      {/* Book Recommendation Section */}
      <section id="recommend" className="p-10 bg-indigo-50 mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">📚 Get Book Recommendations</h2>
        <p className="text-center mb-6 text-gray-600">
          Powered by Gemini AI – just type a topic or interest and get book suggestions instantly.
        </p>

        <div className="text-center mt-6">
          <Link href="/recommendation">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              To get book recommendations
            </button>
          </Link>
        </div>
      </section>
      

      {/* Footer */}
      <footer className="p-6 bg-blue-600 text-white text-center mt-10">
        <p>© 2025 SmartLibrary. All rights reserved.</p>
        <p className="mt-2">
          <a href="#" className="underline">Contact</a> | 
          <a href="#" className="underline"> Privacy</a> | 
          <a href="#" className="underline"> GitHub</a>
        </p>
      </footer>
    </div>
  );
}
