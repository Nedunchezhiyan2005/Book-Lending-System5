import Link from "next/link";
import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "users"), formData);
      setUserId(docRef.id);
      alert("Signup successful!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Signup failed!");
    }
  };

  return (
    <div className="p-10 bg-indigo-50 max-w-md mx-auto">
      <h2 className="text-2xl mb-4 font-bold text-center">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <select
          className="w-full p-2 border rounded"
          name="role"
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="librarian">Librarian</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-blue-600 text-white p-2 rounded w-full" type="submit">
          Register
        </button>
      </form>

      {userId && (
        <div className="mt-4 text-green-700 text-sm">
          🎉 User registered! Your ID: <strong>{userId}</strong>
        </div>
      )}

      <p className="text-center text-sm mt-4">
            Back To Home <Link href="/" className="text-blue-600 underline">Back</Link>
      </p>


    </div>
  );
}
