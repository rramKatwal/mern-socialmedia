import jwt from "jsonwebtoken";

//verify token
export const isSignIn = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return res.status(401).json({
            success: false,
            message: "Invalid token",
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Token verification failed",
          });
        }
      }

      req.user = decode;
      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting user",
      errror: error.message,
    });
  }
};
