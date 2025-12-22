import { useState } from "react";
import {
  Lock,
  User,
  LogIn,
  GraduationCap,
  Mail,
  Phone,
  BookOpen,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./Subject";
function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    phone: "",
    classRoom: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async () => {
    // Validation
    if (!formData.fullName.trim()) return alert("⚠️ กรุณากรอกชื่อ-นามสกุล");
    if (!formData.studentId.trim()) return alert("⚠️ กรุณากรอกรหัสนักเรียน");
    // if (!formData.email.trim()) return alert("⚠️ กรุณากรอกอีเมล");
    // if (!formData.phone.trim()) return alert("⚠️ กรุณากรอกเบอร์โทรศัพท์");
    // if (!formData.classRoom.trim()) return alert("⚠️ กรุณากรอกห้องเรียน");
    if (!formData.username.trim()) return alert("⚠️ กรุณากรอกชื่อผู้ใช้");
    if (!formData.password.trim()) return alert("⚠️ กรุณากรอกรหัสผ่าน");

    if (formData.password !== formData.confirmPassword) {
      return alert("❌ รหัสผ่านไม่ตรงกัน");
    }

    if (formData.password.length < 6) {
      return alert("⚠️ รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/create-std`, formData);
      if (res.data.err) {
        alert(res.data.err);
      }
      if (res.status === 200) {
        alert("ลงทะเบียนสำเร็จ");
        setFormData({
          fullName: "",
          studentId: "",
          email: "",
          phone: "",
          classRoom: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-1/2 left-1/3 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-2xl border border-white/20 my-8">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          ลงทะเบียนผู้ใช้ใหม่
        </h2>
        <p className="text-white/70 text-center mb-8 text-sm">
          กรอกข้อมูลเพื่อสร้างบัญชีในระบบเช็คชื่อเข้าเรียน
        </p>

        {/* Form */}
        <div className="space-y-4">
          {/* Row 1: Full Name & Student ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white font-semibold mb-2 block flex items-center gap-2 text-sm">
                <User className="w-4 h-4" />
                ชื่อ-นามสกุล
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 pl-10 rounded-xl bg-white/90 text-gray-800 outline-none focus:ring-2 focus:ring-emerald-400 transition shadow-sm text-sm"
                  placeholder="นายสมชาย ใจดี"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="text-white font-semibold mb-2 block flex items-center gap-2 text-sm">
                <CreditCard className="w-4 h-4" />
                รหัสนักเรียน
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 pl-10 rounded-xl bg-white/90 text-gray-800 outline-none focus:ring-2 focus:ring-emerald-400 transition shadow-sm text-sm"
                  placeholder="663170010324"
                  value={formData.studentId}
                  onChange={(e) => handleChange("studentId", e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Row 3: Classroom & Username */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white font-semibold mb-2 block flex items-center gap-2 text-sm">
                <User className="w-4 h-4" />
                ชื่อผู้ใช้
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 pl-10 rounded-xl bg-white/90 text-gray-800 outline-none focus:ring-2 focus:ring-emerald-400 transition shadow-sm text-sm"
                  placeholder="username123"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Row 4: Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white font-semibold mb-2 block flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4" />
                รหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full p-3 pl-10 rounded-xl bg-white/90 text-gray-800 outline-none focus:ring-2 focus:ring-emerald-400 transition shadow-sm text-sm"
                  placeholder="อย่างน้อย 6 ตัวอักษร"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="text-white font-semibold mb-2 block flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4" />
                ยืนยันรหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full p-3 pl-10 rounded-xl bg-white/90 text-gray-800 outline-none focus:ring-2 focus:ring-emerald-400 transition shadow-sm text-sm"
                  placeholder="กรอกรหัสผ่านอีกครั้ง"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  onKeyPress={handleKeyPress}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>กำลังลงทะเบียน...</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>ลงทะเบียน</span>
              </>
            )}
          </button>

          {/* Login Link */}
          <div className="text-center mt-4">
            <p className="text-white/70 text-sm">
              มีบัญชีอยู่แล้ว?{" "}
              <Link
                to={"/"}
                className="text-emerald-300 hover:text-emerald-200 font-semibold underline"
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-white/60 text-xs mt-4">
            © {new Date().getFullYear()} ระบบเช็คชื่อเข้าเรียน - All Rights
            Reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
