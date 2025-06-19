import { checkAdminExistByUsername } from "../Models/checkAdminExistByUsernameModel.js";
import { checkAdminExistsByEmail } from "../Models/checkAdminExistsByEmailModel.js";
import { checkAdminExistsByAadhar } from "../Models/checkAdminExistsByAadharModel.js";
import { createAdminReq } from "../Models/createAdminReqModel.js";
import { mailSA_A } from "../Models/mailToSuperAdmin_AdminModel.js";
import client from "../../../config/sqlDB.js";
export const registerAdmin = async (req, res) => {
  console.log(req.body);
  try {
    client.query("BEGIN");
    const admin_exist = await checkAdminExistsByEmail(req.body.email);
    const admin_exist_aadhar = await checkAdminExistsByAadhar(req.body.aadhar);
    const admin_exist_username = await checkAdminExistByUsername(
      req.body.username
    );

    console.log("Admin Exists email : " + admin_exist);
    console.log("Admin Exists aadhar : " + admin_exist_aadhar);
    console.log("Admin Exists username : " + admin_exist_username);

    if (admin_exist_username) {
      if (admin_exist_username === "pending_admin_req") {
        return res.status(409).json({
          error: "Admin with this Username is already in Pending Queue!",
        });
      } else if (admin_exist_username === "admin") {
        return res.status(409).json({
          error: "Admin with this Username is already Registered!",
        });
      }
    } else if (admin_exist) {
      if (admin_exist === "pending_admin_req") {
        return res.status(409).json({
          error: "Admin with this Email is already in Pending Queue!",
        });
      } else if (admin_exist === "admin") {
        return res
          .status(409)
          .json({ error: "Admin with this Email is already Registered!" });
      }
    } else if (admin_exist_aadhar) {
      if (admin_exist_aadhar === "pending_admin_req") {
        return res.status(409).json({
          error: "Admin with this Aadhar is already in Pending Queue!",
        });
      } else if (admin_exist_aadhar === "admin") {
        return res.status(409).json({
          error: "Admin with this Aadhar Number is already Registered!",
        });
      }
    }
    // console.log("hello");

    const admin = await createAdminReq(req.body);
    console.log(admin);
    const getSA = await mailSA_A(admin);
    // console.log("hello2");
    client.query("COMMIT");
    return res.status(201).json(admin);
  } catch (err) {
    // console.error(err);
    client.query("ROLLBACK");
    console.log(`Error in Controller: ${err}`);
    res.status(500).json({ error: err.detail });
    0;
  }
};
