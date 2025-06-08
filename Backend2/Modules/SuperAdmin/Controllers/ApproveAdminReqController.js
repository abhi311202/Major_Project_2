import { getPendingReqByID } from "../Models/getPendingReqByIDModel.js";
import { Approve_Pending_Req } from "../Models/ApprovePendingReqModel.js";
import { Delete_Pending_Req_By_ID } from "../Models/DeletePendingReqByIDModel.js";
import { Delete_From_Admin_Table_By_ID } from "../Models/DeleteFromAdminTableByIDModel.js";
import client from "../../../config/sqlDB.js";

export const Approve_Req = async (req, res) => {
  console.log("Hello");
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
            error: "Insertion of Pending Request in Admin Table Failed",
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
  



