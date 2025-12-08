import { useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (!token) return (location.href = "/");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 p-6 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white/20 backdrop-blur-lg px-6 py-4 rounded-xl border border-white/30 shadow-lg">
        <h1 className="text-xl font-bold">ระบบเช็คชื่อเข้าเรียน</h1>

        <div className="space-x-6 text-lg">
          <Link
            to="/dashboard"
            className="hover:text-yellow-300 transition font-semibold"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="hover:text-yellow-300 transition font-semibold"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-red-300 transition font-semibold"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mt-10 flex justify-center">
        <div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/30 max-w-xl w-full text-center">
          <h2 className="text-3xl font-bold mb-4">ยินดีต้อนรับ!</h2>
          <p className="text-white/90 text-lg">
            เข้าสู่ระบบเช็คชื่อเข้าเรียนสำเร็จแล้ว 🎉
            <br />
            กรุณาเลือกเมนูด้านบนเพื่อใช้งานระบบ
          </p>

          {/* Example Card */}
          <div className="mt-8 bg-white/10 p-6 rounded-xl border border-white/20">
            <h3 className="text-xl font-semibold mb-2">📚 สรุปภาพรวมวันนี้</h3>
            <p className="text-white/80">
              - จำนวนคลาสที่ต้องเช็คชื่อ: 3
              <br />
              - นักเรียนขาดเรียน: 0
              <br />- สถานะระบบ: ปกติ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
