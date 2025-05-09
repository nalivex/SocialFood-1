const mysql = require("mysql");
const config = require("./config");
const userSchema = require("../schemas/userSchema");



const connectDB = async () => {
  const pool = mysql.createPool(config);

  pool.getConnection((err, connection) => {
    if (err) {
      console.log({ error: err.message });
    }

    console.log("Connected to MySQL database");
    connection.query(userSchema, (err, results) => {
      if (err) {
        console.error("Erro ao criar a tabela 'users':", err.message);
      } else {
        console.log("Tabela 'users' verificada/criada com sucesso.");
      }
      connection.release();
  });
});
};

module.exports = connectDB;