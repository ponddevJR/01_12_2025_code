import { useEffect, useState } from "react";

function Profile() {
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (!token) return (location.href = "/");
  }, []);

  const addProfile = () => {
    if (!name.trim()) return alert("กรุณากรอกชื่อ-นามสกุล");
    setProfiles([...profiles, { id: Date.now(), name }]);
    setName("");
  };

  const deleteProfile = (id) => {
    setProfiles(profiles.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-700 p-6 text-white flex justify-center">
      <div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/30 w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          จัดการข้อมูลโปรไฟล์
        </h2>

        {/* Input + Button */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            className="flex-1 p-3 rounded-lg bg-white/80 text-black outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="ชื่อ - นามสกุล"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={addProfile}
            className="px-5 py-3 bg-green-500 hover:bg-green-600 transition rounded-lg font-semibold"
          >
            เพิ่มข้อมูล
          </button>
        </div>

        {/* List */}
        <ul className="space-y-3">
          {profiles.map((p) => (
            <li
              key={p.id}
              className="flex justify-between items-center bg-white/10 p-4 rounded-xl border border-white/20"
            >
              <span className="text-lg">{p.name}</span>

              <button
                onClick={() => deleteProfile(p.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 transition rounded-lg"
              >
                ลบ
              </button>
            </li>
          ))}
        </ul>

        {profiles.length === 0 && (
          <p className="text-center text-white/80 mt-4">
            ยังไม่มีข้อมูลโปรไฟล์
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
