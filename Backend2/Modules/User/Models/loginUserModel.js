import client from "../../../config/sqlDB.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (username, password) => {
  // console.log(password);
  try {
    const query = `SELECT * FROM "active_user_subscription_view_2"
      WHERE username = $1 AND is_delete = false AND is_active = true
      LIMIT 1;`;

    const result = await client.query(query, [username]);
    if (result.rows.length === 0) {
      console.log(result);
      throw new Error("User not found");
    }

    const user = result.rows[0];
    // console.log(result);
    // console.log(user);
    const isMatch = await bcryptjs.compare(password, user.password_hash);
    console.log(isMatch, "abhi");
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
      { expiresIn: "2h" }
    );

    const { password_hash, ...userWithoutPassword } = user;

    return {
      message: "Login Successful!!",
      user: userWithoutPassword,
      token,
    };
  } catch (error) {
    console.log("Error Occured in loginUser : " + error);
    throw error;
  }
};

export const loginUser1 = async (email, password) => {
  // console.log(password);
  try {
    const query = `SELECT * FROM "active_user_subscription_view_2"
      WHERE email = $1 AND is_delete = false AND is_active = true
      LIMIT 1;`;

    const result = await client.query(query, [email]);

    if (result.rows.length === 0) {
      console.log(result);
      throw new Error("User not found");
    }

    const user = result.rows[0];
    // console.log(result);
    // console.log(user);
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
      { expiresIn: "2h" }
    );

    const { password_hash, ...userWithoutPassword } = user;

    return {
      message: "Login Successful!!",
      user: userWithoutPassword,
      token,
    };
  } catch (error) {
    console.log("Error Occured in loginUser1 : " + error);
    throw error;
  }
};
