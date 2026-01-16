import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  BookOpen,
  Loader2,
  CheckCircle,
  FileText,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

export const API_URL = import.meta.env.VITE_API;

export default function CourseCRUD() {
  const token = JSON.parse(localStorage.getItem("loginToken"));

  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    course_id: "",
    course_name: "",
    teacher_name: "",
  });

  // เปลี่ยน URL ตามที่คุณตั้งค่าใน .env

  // Load data from API on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/get-all-subjects`);
      const data = await response.json();
      setCourses(data.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("ไม่สามารถโหลดข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.course_id ||
      !formData.course_name ||
      !formData.teacher_name
    ) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    try {
      setLoading(true);

      if (editingCourse) {
        // Update existing course
        const response = await fetch(
          `${API_URL}/update-subject/${editingCourse.course_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              course_name: formData.course_name,
              teacher_name: formData.teacher_name,
            }),
          }
        );

        if (response.ok) {
          alert("แก้ไขข้อมูลสำเร็จ");
          await fetchCourses();
          resetForm();
        } else {
          const errorData = await response.json();
          alert(errorData.error || "เกิดข้อผิดพลาด");
        }
      } else {
        // Add new course
        const response = await fetch(`${API_URL}/create-subject`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("เพิ่มข้อมูลสำเร็จ");
          await fetchCourses();
          resetForm();
        } else {
          const errorData = await response.json();
          alert(errorData.error || "เกิดข้อผิดพลาด");
        }
      }
    } catch (error) {
      console.error("Error saving:", error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      course_id: course.course_id,
      course_name: course.course_name,
      teacher_name: course.teacher_name,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("คุณต้องการลบรายวิชานี้หรือไม่?")) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/delete-subject/${courseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("ลบข้อมูลสำเร็จ");
        await fetchCourses();
      } else {
        alert("ไม่สามารถลบข้อมูลได้");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("ไม่สามารถลบข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ course_id: "", course_name: "", teacher_name: "" });
    setEditingCourse(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <Link className="mb-2 flex items-center gap-2" to={"/dashboard"}>
        <Home />
        <p>หน้าหลัก</p>
      </Link>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  ระบบจัดการรายวิชา
                </h1>
                <p className="text-gray-500 mt-1">
                  จัดการข้อมูลรายวิชาและอาจารย์ผู้สอน
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              เพิ่มรายวิชา
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {loading && courses.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <span className="ml-3 text-gray-600">กำลังโหลดข้อมูล...</span>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                ยังไม่มีรายวิชา กรุณาเพิ่มรายวิชาใหม่
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      ลำดับ
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      รหัสวิชา
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      ชื่อรายวิชา
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      อาจารย์ผู้สอน
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courses.map((course, index) => (
                    <tr
                      key={course.course_id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-blue-600">
                          {course.course_id}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-medium">
                        <Link
                          to={`/check-manual/${course.course_id}/${
                            JSON.parse(localStorage.getItem("loginToken"))
                              .data?.student_id
                          }`}
                          className="hover:text-blue-500 hover:underline"
                        >
                          {" "}
                          {course.course_name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {course.teacher_name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(course)}
                            disabled={loading}
                            className="flex items-center gap-1 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="แก้ไข"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span className="text-sm">แก้ไข</span>
                          </button>
                          <button
                            onClick={() => handleDelete(course.course_id)}
                            disabled={loading}
                            className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="ลบ"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm">ลบ</span>
                          </button>
                          {/* <Link
                            className="flex items-center gap-2 p-2 rounded-md text-white bg-green-500"
                            to={`/check-class/${course.course_id}`}
                          >
                            <CheckCircle size={18} />
                            เช็คชื่อ
                          </Link> */}
                          <Link
                            className="flex items-center gap-2 p-2 rounded-md text-white bg-blue-500"
                            to={`/class-detail/${course.course_id}/${token?.data?.student_id}`}
                          >
                            <FileText size={18} />
                            รายละเอียด
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer */}
          {courses.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                แสดงทั้งหมด{" "}
                <span className="font-semibold text-blue-600">
                  {courses.length}
                </span>{" "}
                รายวิชา
              </p>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {editingCourse ? "แก้ไขรายวิชา" : "เพิ่มรายวิชาใหม่"}
                </h2>
                <button
                  onClick={resetForm}
                  disabled={loading}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    รหัสวิชา
                  </label>
                  <input
                    type="text"
                    name="course_id"
                    value={formData.course_id}
                    onChange={handleInputChange}
                    disabled={editingCourse !== null || loading}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="เช่น CS101"
                  />
                  {editingCourse && (
                    <p className="text-xs text-gray-500 mt-1">
                      * ไม่สามารถแก้ไขรหัสวิชาได้
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ชื่อรายวิชา
                  </label>
                  <input
                    type="text"
                    name="course_name"
                    value={formData.course_name}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:opacity-50"
                    placeholder="เช่น การเขียนโปรแกรมคอมพิวเตอร์"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ชื่ออาจารย์ผู้สอน
                  </label>
                  <input
                    type="text"
                    name="teacher_name"
                    value={formData.teacher_name}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:opacity-50"
                    placeholder="เช่น อ.สมชาย ใจดี"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>กำลังบันทึก...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>{editingCourse ? "บันทึก" : "เพิ่ม"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
