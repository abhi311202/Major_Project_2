import { createUser } from "../Models/createUser.js";

import { checkUserExistByUsername } from "../Models/checkUserExistByUsernameModel.js";
import { checkUserExistsByAadhar } from "../Models/checkUserExistsByAadharModel.js";
import { checkUserExistsByEmail } from "../Models/checkUserExistsByEmailModel.js";

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
