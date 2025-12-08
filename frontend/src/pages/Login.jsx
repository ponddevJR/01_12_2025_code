import { useEffect, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (token) return (location.href = "/dashboard");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "663170010324" && password === "663170010324") {
      const token = "login token";
      localStorage.setItem("loginToken", token);
      location.href = "/dashboard";
    } else {
      return alert("รหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-150 from-blue-500 to-cyan-700 p-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-sm border border-white/30">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          ระบบเช็คชื่อเข้าเรียน
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div>
            <label className="text-white font-semibold">ชื่อผู้ใช้</label>
            <input
              type="text"
              className="mt-1 w-full p-3 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="กรอกชื่อผู้ใช้"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-white font-semibold">รหัสผ่าน</label>
            <input
              type="password"
              className="mt-1 w-full p-3 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="กรอกรหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-semibold"
          >
            เข้าสู่ระบบ
          </button>

          <p className="text-center text-white/90 text-sm mt-4">
            © {new Date().getFullYear()} ระบบเช็คชื่อเข้าเรียน
          </p>
        </form>
      </div>
    </div>
  );
}
