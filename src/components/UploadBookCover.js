"use client";

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "@/lib/firebase";

export default function UploadBookCover() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file || !title) return alert("Enter title and select a file");

    try {
      setUploading(true);

      // 1. Upload to Firebase Storage
      const storageRef = ref(storage, `book-covers/${file.name}`);
      await uploadBytes(storageRef, file);

      // 2. Get URL
      const imageUrl = await getDownloadURL(storageRef);

      // 3. Save to Firestore
      await addDoc(collection(db, "books"), {
        title,
        coverUrl: imageUrl,
        createdAt: new Date(),
      });

      alert("Book uploaded!");
      setTitle("");
      setFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Upload Book Cover</h2>
      <input
        type="text"
        placeholder="Book Title"
        className="border p-2 mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        className="mb-2"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
