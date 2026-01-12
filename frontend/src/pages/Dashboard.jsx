import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [userName, setUserName] = useState("อาจารย์สมชาย");

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (!token) return (location.href = "/");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    location.href = "/";
  };

  const stats = [
    {
      label: "คลาสทั้งหมด",
      value: "12",
      icon: "📚",
      color: "from-blue-400 to-blue-600",
    },
    {
      label: "เช็คชื่อวันนี้",
      value: "3",
      icon: "✅",
      color: "from-green-400 to-green-600",
    },
    {
      label: "นักเรียนขาด",
      value: "5",
      icon: "⚠️",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      label: "เปอร์เซ็นต์เข้าเรียน",
      value: "94%",
      icon: "📊",
      color: "from-purple-400 to-purple-600",
    },
  ];

  const recentClasses = [
    {
      name: "คณิตศาสตร์ ม.4/1",
      time: "08:00 - 09:00",
      students: "38/40",
      status: "เสร็จสิ้น",
    },
    {
      name: "ฟิสิกส์ ม.5/2",
      time: "09:00 - 10:00",
      students: "35/35",
      status: "เสร็จสิ้น",
    },
    {
      name: "เคมี ม.6/3",
      time: "10:00 - 11:00",
      students: "32/33",
      status: "กำลังดำเนินการ",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Navbar */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-2xl">
              🎓
            </div>
            <h1 className="text-xl font-bold">ระบบเช็คชื่อเข้าเรียน</h1>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="hover:text-blue-300 transition font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/my-profile"
              className="hover:text-blue-300 transition font-medium"
            >
              โปรไฟล์
            </Link>
            <Link
              to="/crud/subject"
              className="hover:text-blue-300 transition font-medium"
            >
              รายวิชา
            </Link>
            <Link
              to="/users"
              className="hover:text-blue-300 transition font-medium"
            >
              ผู้ใข้งาน
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-lg transition font-medium border border-red-400/30"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">สวัสดี, ยินดีต้อนรับ👋</h2>
          <p className="text-white/70">
            *ข้อมูลจำลอง ภาพรวมการเช็คชื่อวันนี้ -{" "}
            {new Date().toLocaleDateString("th-TH", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 cursor-pointer"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-4`}
              >
                {stat.icon}
              </div>
              <p className="text-white/70 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Classes */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>📋</span> คลาสเรียนล่าสุด
          </h3>
          <div className="space-y-3">
            {recentClasses.map((cls, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-lg">{cls.name}</h4>
                    <p className="text-white/60 text-sm">{cls.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{cls.students}</p>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        cls.status === "เสร็จสิ้น"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-blue-500/20 text-blue-300"
                      }`}
                    >
                      {cls.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-xl py-3 font-semibold transition">
            ดูทั้งหมด →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
