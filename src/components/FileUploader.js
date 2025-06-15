import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("No file selected");

    const storageRef = ref(storage, `books/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    setUrl(downloadURL);
  };

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">📁 Upload Book File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Upload
      </button>
      {url && (
        <p className="mt-4 text-green-600">
          File uploaded! <a href={url} className="underline" target="_blank">View File</a>
        </p>
      )}
    </div>
  );
}
