import { useEffect, useState } from "react";
import { Trash2, UserPlus, Search } from "lucide-react";
import axios from "axios";
import { API_URL } from "./Subject";

export default function Users() {
  const [students, setStudents] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const [load, setLoad] = useState(true);
  const getAll = async () => {
    try {
      const res = await axios.get(`${API_URL}/students`);
      setStudents(res.data.data);
      console.log("🚀 ~ getAll ~ res.data:", res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };
  useEffect(() => {
    getAll();
  }, []);
  if (load) return <p>กำลังโหลด...</p>;

  const confirmDelete = async (id) => {
    try {
      // ส่งคำขอลบไปยัง API
      await axios.delete(`${API_URL}/students/${id}`);

      // ลบออกจาก state
      getAll();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("เกิดข้อผิดพลาดในการลบข้อมูล");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setStudentToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">จัดการนักเรียน</h1>
            {/* <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              <UserPlus className="w-5 h-5" />
              เพิ่มนักเรียน
            </button> */}
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหา รหัสนักเรียน, ชื่อ, หรือสาขา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    รหัสนักเรียน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ชื่อ-นามสกุล
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สาขาวิชา
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ชั้นปี
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student?.student_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {student?.fullname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {student?.major}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => confirmDelete(student?.student_id)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      ไม่พบข้อมูลนักเรียน
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-4 text-sm text-gray-600">
            แสดง {students.length} จาก {students.length} รายการ
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              ยืนยันการลบ
            </h2>
            <p className="text-gray-600 mb-6">
              คุณต้องการลบนักเรียน <strong>{studentToDelete?.fullName}</strong>{" "}
              (รหัส: {studentToDelete?.studentId}) ใช่หรือไม่?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                ยกเลิก
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
