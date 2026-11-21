import axios from "axios";
import { backendApiUrl } from "./backendUrl";

export const approveByFPO = async (contractId: string, fpoId: string) => {
  try {
    const res = await axios.post(
      backendApiUrl("contracts/approve-fpo"),
      {
        contractId,
        fpoId
      }
    );

    return res.data;  // { msg: "...", contract: {...} }
  } catch (err:any) {
    console.error(err);
    throw new Error(err?.response?.data?.msg || "Failed to approve request");
  }
};
