import jwt from "jsonwebtoken";

export const sendcookie = (user, res, message, status = 200) => {
  const token = jwt.sign({ user }, process.env.JWt_SECRET);

  res
    .status(status)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
