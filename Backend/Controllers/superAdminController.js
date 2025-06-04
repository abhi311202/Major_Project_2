import {
  getAdminRequests,
  loginAdmin,
  getPendingReqByID,
  Approve_Pending_Req,
  Delete_Pending_Req_By_ID,
  Delete_From_Admin_Table_By_ID,
  Delete_Pending_Req_By_ID1,
  get_th1,
  set_th1,
  del_th1,
} from "../Models/SuperAdminModel.js";

// const nodemailer = require('nodemailer');
import nodemailer from "nodemailer";

import {
  Verification_Email_Template,
  Welcome_Email_Template,
} from "../Src/EmailTemplate.js";

import dotenv from "dotenv";
dotenv.config();

export const adminRequest = async (req, res) => {
  try {
    const requests = await getAdminRequests();

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching pending admin requests:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch pending admin requests.",
    });
  }
};

export const adminLogin = async (req, res) => {
  console.log(req.body);
  const { username, password_hash, email } = req.body;
  if (username && password_hash) {
    console.log("Username API CAlled " + username, password_hash);

    try {
      const result = await loginAdmin(
        req.body.username,
        req.body.password_hash
      );
      // console.log(result);

      res.cookie("jwt", result.token);
      res.status(200).json(result);
    } catch (err) {
      console.log(`Error in Controller Login: ${err.message}`);
      res.status(500).json({ error: err.message });
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

export const Approve_Req = async (req, res) => {
  try {
    const { SuperAdmin_id, Pending_Request_id } = req.body;
    // console.log(Pending_Request_id);
    const pendingReq = await getPendingReqByID(Pending_Request_id);

    if (pendingReq) {
      //   console.log(pendingReq);
      const AproovedAdmin = await Approve_Pending_Req(
        SuperAdmin_id,
        pendingReq
      );

      if (!AproovedAdmin) {
        return res.status(404).json({
          error: "Insetion of Pending Request in Admin Table Failed",
          message: "Error in Approving request",
        });
      } else {
        const dele = await Delete_Pending_Req_By_ID(Pending_Request_id);
        if (!dele) {
          console.log(AproovedAdmin);
          const deletfromAdmin = await Delete_From_Admin_Table_By_ID(
            AproovedAdmin
          );
          console.log(deletfromAdmin);
        } else {
          return res.status(200).json({
            message: "Request Approved Seccessfully",
          });
        }
      }
    } else {
      return res.status(404).json({
        error: "No Pending Request found.",
        message: "No Pendfing Request found, Please Refresh the page..!!",
      });
    }
  } catch (error) {
    console.log("Error in Approving Request: ", error);
    return res.status(500).json({ errors: "Error in Approving Request." });
  }
};

export const Delete_Req = async (req, res) => {
  try {
    const { Pending_Request_id } = req.body;
    const dele = await Delete_Pending_Req_By_ID1(Pending_Request_id);
    if (dele) {
      return res.status(200).json({
        message: "Request Deleted Seccessfully",
      });
    } else {
      throw new Error("Request Deletion Failed");
    }
  } catch (error) {
    console.log("Error in Deleting Request: ", error);
    return res.status(500).json({
      message: "Request Deletion Failed",
      error: error.message || error,
    });
  }
};

// export const Set_Threshold = async (req, res) => {
//   try {
//     const { Threshhold_value, current_TH_id } = req.body;
//     console.log(Threshhold_value, current_TH_id);
//   } catch (error) {
//     console.log("Error in Setting Threshold: ", error);
//     return res.status(500).json({
//       message: "Threshol setting failed...",
//       error: error.message || error,
//     });
//   }
// };

export const Set_Threshold1 = async (req, res) => {
  try {
    const { threshold_id, threshold_value, super_admin_id } = req.body;
    console.log(threshold_id, threshold_value, super_admin_id);

    const th = await set_th1(threshold_value, super_admin_id);

    if (th) {
      const dth = await del_th1(threshold_id);
      if (dth) {
        return res.status(200).json({
          success: true,
          message: "New Threshold Set Sucessfully...",
          data: {
            id: th,
          },
        });
      } else {
        throw new Error("Error in deleting previous threshold value");
      }
    } else {
      throw new Error("Error in Setting new threshold value");
    }
  } catch (error) {
    // rollback logic....

    console.log("Error in Setting Threshold: ", error);
    return res.status(500).json({
      success: false,
      message: "Setting new threshold failed",
      error: error.message || error,
      data: {},
    });
  }
};

export const Fetch_Threshold1 = async (req, res) => {
  try {
    console.log("In get threshold controller");
    const th = await get_th1();
    console.log(th.id, th.threshold_value);

    return res.status(200).json({
      success: true,
      message: "Threshold fetching Secessful...",
      data: {
        threshold_id: th.id,
        threshold_value: th.threshold_value,
      },
    });
  } catch (error) {
    console.log("Error in Fetching Threshold: ", error);
    return res.status(500).json({
      message: "Threshol Fetching failed...",
      error: error.message || error,
    });
  }
};

export const sendEmailOTP = async (email) => {
  try {
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Admin Request Accepted",
      text: `Your request is accepted seccessfully...`,
      html: Welcome_Email_Template.replace("{name}", email),
    });
  } catch (error) {
    console.log(error);
  }
};
