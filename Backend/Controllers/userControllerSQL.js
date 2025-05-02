import {
  createUser,
  checkUserExistsByEmail,
  checkUserExistsByAadhar,
  checkUserExistByUsername,
  loginUser,
  getuserbyusername,
} from "../Models/UserModelSQL.js";
 
export const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const user_exists = await checkUserExistsByEmail(req.body.email);
    const user_exist_aadhar = await checkUserExistsByAadhar(req.body.aadhar);
    const user_exist_username = await checkUserExistByUsername(
      req.body.username
    );
    console.log(user_exists);

    if (user_exist_username) {
      return res
        .status(409)
        .json({ error: "User with this Username is already Registered!" });
    } else if (user_exists) {
      return res
        .status(409)
        .json({ error: "User with this Email is already Registered!" });
    } else if (user_exist_aadhar) {
      return res
        .status(409)
        .json({ error: "User with this Aadhar Number is already Registered!" });
    }
    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (err) {
    // console.error(err);
    console.log(`Error in Controller: ${err}`);
    res.status(500).json({ error: err.detail });
    0;
  }
};

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

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout Successfull!!" });
  } catch (error) {
    res.status(500).json({ errors: "Error in logout" });
    console.log("Error in logout", error);
  }
};

export const demo = async (req, res) => {
  try {
    res.status(200).json({ message: "Valid token...!" });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
};
