import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import client from "../../../config/sqlDB.js";

export const loginAdmin = async (username, password) => {
  const query = `SELECT * FROM "admin"
        WHERE username = $1 AND is_delete = false
        LIMIT 1;`;

  const result = await client.query(query, [username]);

  if (result.rows.length === 0) {
    console.log(result);
    throw new Error("dmin not found");
  }

  const user = result.rows[0];

  const isMatch = await bcryptjs.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  // console.log(user);

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      // role: user.role || "user", // if role exists
    },
    process.env.JWT_USER_PASSWORD,
    { expiresIn: "1m" }
  );

  const { password_hash, ...userWithoutPassword } = user;

  return {
    message: "Login Successful!!",
    Admin: userWithoutPassword,
    token,
  };
};
