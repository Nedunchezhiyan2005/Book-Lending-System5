import { useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function UserProfileFetcher() {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserProfile = async () => {
    if (!userId) return;

    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        setError("No user found with this ID.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user data.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Fetch User Profile by ID</h2>

      <input
        type="text"
        placeholder="Enter User ID (UID)"
        className="w-full p-2 mb-4 border rounded"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <button
        onClick={fetchUserProfile}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Fetch Profile
      </button>

      {loading && <p className="text-center mt-4">Loading...</p>}

      {error && <p className="text-red-600 text-center mt-4">{error}</p>}

      {userData && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
          <p><strong>Joined:</strong> {userData.createdAt?.toDate().toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}
