import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { connectDB } from "../data/database.js";
import ErrorHandler from "../middleware/error.js";
import { sendcookie } from "../utilis/feature.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    await User();
    // Establish database connection
    const connection = await connectDB();
    // Check if user with this email already exists
    const checkUserQuery = `SELECT id FROM users WHERE email = ? `;

    const [existingUser] = await connection.query(checkUserQuery, [email]);

    if (existingUser.length > 0) {
      connection.release();
      return next(new ErrorHandler("User already exists", 400));
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Insert new user
    const createUserQuery = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;
    await connection.query(createUserQuery, [name, email, hashedPassword]);

    sendcookie(email, res, "registered succesfully", 201);

    connection.release();
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const connection = await connectDB();
    // Check if user with this email exists
    const checkUserQuery = `SELECT id, name, email, password FROM users WHERE email = ?`;
    const [existingUser] = await connection.query(checkUserQuery, [email]);

    if (existingUser.length === 0) {
      connection.release();
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Verify password
    const hashedPassword = existingUser[0].password;
    const passwordMatch = await bcryptjs.compare(password, hashedPassword);

    if (!passwordMatch) {
      connection.release();
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendcookie(email, res, `Welcome back, ${existingUser[0].name}`, 200);

    connection.release();
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
