// db/db.js
const mysql = require("mysql2/promise"); // mysql2 com promise
const config = require("./config");
const userSchema = require("../schemas/userSchema");

const pool = mysql.createPool(config);

async function connectDB() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database");

    await connection.query(userSchema);
    console.log("Tabela 'users' verificada/criada com sucesso.");

    connection.release();
  } catch (err) {
    console.error("Erro ao conectar/criar tabela:", err.message);
  }
}

module.exports = { pool, connectDB, };