import { useState, useEffect } from "react";

export default function UserStatus() {
  const [online, setOnline] = useState(true);                // 1
  const [currentTime, setCurrentTime] = useState("");        // 2
  const [isMobile, setIsMobile] = useState(false);           // 3

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []); // ⏰ Update time every second

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []); // 🌐 Monitor network status

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []); // 📱 Check if user is on mobile
  

  return (
    <div className="text-sm text-center text-gray-600 mt-4">
      <p>Status: <span className={online ? 'text-green-600' : 'text-red-600'}>{online ? "Online" : "Offline"}</span></p>
      {currentTime && <p>Current Time: {currentTime}</p>}
      <p>Device: {isMobile ? "Mobile" : "Desktop"}</p>
    </div>
  );
}
