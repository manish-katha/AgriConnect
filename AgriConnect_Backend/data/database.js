import mysql from "mysql2/promise";

let pool; // Declare pool outside to ensure access to `pass`.

export const connectDB = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.HOST,
      user: process.env.USERS,
      password: process.env.PASSWORDS, // Use the retrieved password here
      database: process.env.DBNAME,
      waitForConnections: true,
    });

    const connection = await pool.getConnection();
    console.log("Connected with MySQL");

    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};
