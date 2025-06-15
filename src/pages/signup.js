import { useState, useEffect } from "react";

export default function Signup() {
  const [password, setPassword] = useState("");             // 1
  const [confirmPassword, setConfirmPassword] = useState(""); // 2
  const [error, setError] = useState("");                   // 3

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
    }
  }, [password, confirmPassword]); // 🔐 Validate password match

  useEffect(() => {
    if (password.length > 0 && password.length < 6) {
      setError("Password must be at least 6 characters.");
    }
  }, [password]); // ⚠️ Password strength warning

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(""); // Auto-clear error after 5 seconds
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]); // ⏱️ Clear error after delay

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans flex items-center justify-center p-6">
      <form
        className="max-w-md w-full shadow-md p-8 rounded border bg-white"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          placeholder="Enter your name"
          required
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="email"
          placeholder="Enter your email"
          required
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <select className="w-full p-2 mb-4 border rounded" required>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="librarian">Librarian</option>
          <option value="admin">Admin</option>
        </select>
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}
        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
