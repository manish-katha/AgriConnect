export const isAuthenticate = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("this is token", token);

  if (!token)
    return res.status(404).json({
      success: false,
      message: "Login first",
    });

  next();
};
