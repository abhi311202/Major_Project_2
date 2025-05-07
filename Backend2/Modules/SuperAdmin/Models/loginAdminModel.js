import client from "../../../config/sqlDB.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = async (username, password) => {
  const query = `SELECT * FROM "super_admin"
          WHERE username = $1 AND is_delete = false
          LIMIT 1;`;

  const result = await client.query(query, [username]);

  if (result.rows.length === 0) {
    console.log(result);
    throw new Error("Super Admin not found");
  }

  const super_admin = result.rows[0];

  const isMatch = await bcryptjs.compare(password, super_admin.password_hash);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  // console.log(user);

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: super_admin.id,
      username: super_admin.username,
      email: super_admin.email,
      //   role: user.role || "user", // if role exists
    },
    process.env.JWT_USER_PASSWORD,
    { expiresIn: "1m" }
  );

  const { password_hash, ...userWithoutPassword } = super_admin;

  return {
    message: "Login Successful!!",
    SuperAdmin: userWithoutPassword,
    token,
  };
};
