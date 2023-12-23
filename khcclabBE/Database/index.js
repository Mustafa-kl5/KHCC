const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: "localhost", // Use the IP address or hostname of your host machine
  user: "sa",
  password: "P@ssword1234",
  database: "KHCC",
  port: 1433, // Use the mapped port of your SQL Server container
});

function connectDB() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error connecting to database:", err.message);
        reject(false);
        return;
      }

      const query = "SELECT * FROM Users;";
      connection.query(query, (err, results) => {
        connection.release(); // Release the connection back to the pool

        if (err) {
          console.error("Error executing query:", err.message);
          reject(false);
        } else {
          console.log("Successfully connected to the database");
          resolve(true);
        }
      });
    });
  });
}

module.exports = { connectDB };
