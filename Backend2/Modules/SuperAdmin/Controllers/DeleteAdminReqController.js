import { Delete_Pending_Req_By_ID1 } from "../Models/DeletePendingReqByID1Model.js";
import client from "../../../config/sqlDB.js";
import { reqDeletionMailToAdminApplicant } from "../Models/reqDeletionMailToAdminApplicantModel.js";

export const Delete_Req = async (req, res) => {
  try {
    const { Pending_Request_id } = req.body;
    client.query("BEGIN");
    const dele = await Delete_Pending_Req_By_ID1(Pending_Request_id);
    if (dele) {
      await reqDeletionMailToAdminApplicant(Pending_Request_id);
      client.query("COMMIT");
      return res.status(200).json({
        message: "Request Deleted Seccessfully",
      });
    } else {
      throw new Error("Request Deletion Failed");
    }
  } catch (error) {
    console.log("Error in Deleting Request: ", error);
    client.query("ROLLBACK");
    return res.status(500).json({
      message: "Request Deletion Failed",
      error: error.message || error,
    });
  }
};
