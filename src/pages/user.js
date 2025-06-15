import { useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function GetUserById() {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

  const handleFetch = async () => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      alert("No user found!");
      setUserData(null);
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Fetch User by ID</h2>
      <input
        className="w-full p-2 mb-2 border rounded"
        type="text"
        placeholder="Enter User ID"
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleFetch} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Get User
      </button>

      {userData && (
        <div className="mt-4 bg-green-50 p-4 rounded border">
          <h3 className="font-bold">User Info:</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
        </div>
      )}
    </div>
  );
}
