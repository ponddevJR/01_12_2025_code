import { Router } from "express";
import pool from "../config/pg.js";

const subjectRoute = Router();

// CREATE: เพิ่มรายวิชา
subjectRoute.post("/create-subject", async (req, res) => {
  try {
    const { course_id, course_name, teacher_name } = req.body;

    // ตรวจสอบข้อมูล
    if (!course_id || !course_name || !teacher_name) {
      return res.status(400).json({
        error: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
      });
    }

    const query = `INSERT INTO courses (course_id, course_name, teacher_name) 
                   VALUES ($1, $2, $3) RETURNING *`;

    const result = await pool.query(query, [
      course_id,
      course_name,
      teacher_name,
    ]);

    res.status(201).json({
      message: "เพิ่มรายวิชาสำเร็จ",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    // จัดการ error duplicate key
    if (error.code === "23505") {
      return res.status(400).json({
        error: "รหัสวิชานี้มีอยู่แล้ว",
      });
    }

    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล",
    });
  }
});

// GET ALL: ดึงข้อมูลทั้งหมด
subjectRoute.get("/get-all-subjects", async (req, res) => {
  try {
    const query = `SELECT * FROM courses ORDER BY course_id ASC`;
    const result = await pool.query(query);

    res.status(200).json({
      message: "ดึงข้อมูลสำเร็จ",
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
    });
  }
});

// GET ONE: ดึงข้อมูลรายการเดียว
subjectRoute.get("/get-subject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM courses WHERE course_id = $1`;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "ไม่พบรายวิชานี้",
      });
    }

    res.status(200).json({
      message: "ดึงข้อมูลสำเร็จ",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
    });
  }
});

// UPDATE: แก้ไขข้อมูล
subjectRoute.put("/update-subject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { course_name, teacher_name } = req.body;

    // ตรวจสอบข้อมูล
    if (!course_name || !teacher_name) {
      return res.status(400).json({
        error: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
      });
    }

    const query = `UPDATE courses 
                   SET course_name = $1, teacher_name = $2 
                   WHERE course_id = $3 
                   RETURNING *`;

    const result = await pool.query(query, [course_name, teacher_name, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "ไม่พบรายวิชานี้",
      });
    }

    res.status(200).json({
      message: "แก้ไขข้อมูลสำเร็จ",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการแก้ไขข้อมูล",
    });
  }
});

// DELETE: ลบข้อมูล
subjectRoute.delete("/delete-subject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM courses WHERE course_id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "ไม่พบรายวิชานี้",
      });
    }

    res.status(200).json({
      message: "ลบรายวิชาสำเร็จ",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการลบข้อมูล",
    });
  }
});

export default subjectRoute;
