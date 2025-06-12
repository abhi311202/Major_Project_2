import { changeAdminPersonalDetailModel } from "../Models/changeAdminPersonalDetailModel.js";
export async function changeAdminPersonalDetailController(req, res) {
  try {
    console.log(req.body);
    const { id, name, username, dob, gender, profession, organization } =
      req.body;
    if (
      !id ||
      !name ||
      !username ||
      !dob ||
      !gender ||
      !profession ||
      !organization
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const updated = await changeAdminPersonalDetailModel({
      id,
      name,
      username,
      dob,
      gender,
      profession,
      organization,
    });
    res.status(200).json(updated);
  } catch (err) {
    console.log("Error in change Admin Personal Detail Controller " + err);
    res.status(400).json({
      success: false,
      message: "Personal Detail Update Failed.",
      error: err.message,
    });
  }
}
