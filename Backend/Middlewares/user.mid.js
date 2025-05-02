import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // console.log("Hello World: "+req.cookies);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "No token Provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log(`Token: ${token}`);

  try {
    const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD);

    const { username } = req.body;

    if (username && username === decoded.username) {
      next();
    }
  } catch (error) {
    console.log("Invalid token or Expired token: " + error);
    return res.status(401).json({ errors: "Invalid token or expired" });
  }
}

export default userMiddleware;
