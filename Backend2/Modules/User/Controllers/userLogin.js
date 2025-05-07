import { loginUser } from "../Models/loginUserModel.js";

export const userLogin = async (req, res) => {
  console.log(req.body);
  const { username, password_hash, email } = req.body;
  if (username && password_hash) {
    console.log("Username API CAlled " + username, password_hash);

    try {
      const result = await loginUser(req.body.username, req.body.password_hash);
      // console.log(result);

      res.cookie("jwt", result.token);
      res.status(200).json(result);
    } catch (err) {
      console.log(`Error in Controller Login: ${err}`);
      res.status(500).json({ error: err.detail });
    }
  } else if (email && password_hash) {
    console.log("Email API Called " + email, password_hash);
  }
};
