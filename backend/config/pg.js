import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "studen_check_monday_afternoon",
  password: "1234",
  port: 5480,
});

export default pool;
