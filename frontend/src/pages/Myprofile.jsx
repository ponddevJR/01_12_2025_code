import { useEffect, useState } from "react";
import { User, Save, Edit2, ArrowLeft, Home } from "lucide-react";
import axios from "axios";
import { API_URL } from "./Subject";
import { Link } from "react-router-dom";

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    stundent_id: "65001",
    fullname: "ตนธาธา ไชย",
    major: "เทคโนโลยีสารสนเทศ",
  });

  const [load, setLoad] = useState(true);
  const getData = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("loginToken")).data;
      console.log("🚀 ~ getData ~ data:", data);
      if (!data) return (location.href = "/");
      const res = await axios.get(`${API_URL}/students/${data?.student_id}`);
      setFormData({
        stundent_id: res.data?.data?.student_id,
        fullname: res.data?.data?.fullname,
        major: res.data?.data?.major,
      });
      console.log("🚀 ~ getData ~ res.data:", res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (load) return <p>กำลังโหลดข้อมูล...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ใช้ Fetch API แทน axios
      const res = await axios.put(
        `${API_URL}/students/${formData.stundent_id}`,
        formData
      );

      setMessage("บันทึกข้อมูลสำเร็จ!");
      setIsEditing(false);
      getData();
    } catch (error) {
      setMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (load) return <p>กำลังโหลด..</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-8">
      <Link
        to={"/dashboard"}
        className="flex items-center gap-2 mb-2 hover:text-blue-500 hover:underline"
      >
        <Home />
        <p>หน้าหลัก</p>
      </Link>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            ข้อมูลโปรไฟล์ผู้กักขัง
          </h1>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <Edit2 className="w-4 h-4" />
              แก้ไข
            </button>
          )}
        </div>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              message.includes("สำเร็จ")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-4 border-gray-300">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mt-2">Profile Image</p>
            </div>

            {/* Profile Information Section */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-gray-600 text-sm block mb-1">
                  รหัสนักศึกษา:
                </label>
                {isEditing ? (
                  <input
                    disabled
                    type="text"
                    name="stundent_id"
                    value={formData.stundent_id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-800">
                    {formData.stundent_id}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-600 text-sm block mb-1">
                  ชื่อ-นามสกุล:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-800">
                    {formData.fullname}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-600 text-sm block mb-1">
                  สาขาวิชา:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-800">
                    {formData.major}
                  </p>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 mt-6 justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                disabled={loading}
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
                disabled={loading}
              >
                <Save className="w-4 h-4" />
                {loading ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
