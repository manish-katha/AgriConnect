import { connectDB } from "../data/database.js";

export const User = async () => {
  try {
    const connection = await connectDB(); // Establish database connection

    // SQL query to create a 'users' table if it doesn't exist
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createDATE DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.query(createUserTableQuery); // Execute query
    console.log("Users table created or already exists");

    connection.release(); // Release the connection
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
};
