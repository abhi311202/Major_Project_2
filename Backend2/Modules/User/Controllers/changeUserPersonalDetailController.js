import { changeUserPersonalDetail } from "../Models/changeUserPersonalDetailModel.js";

export async function changeUserPersonalDetailController(req, res) {
  try {
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
    const updated = await changeUserPersonalDetail({
      id,
      name,
      username,
      dob,
      gender,
      profession,
      organization,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
