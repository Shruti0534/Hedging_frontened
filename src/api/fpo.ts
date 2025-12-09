import axios from "axios";

export const approveByFPO = async (contractId: string, fpoId: string) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/contracts/approve-fpo`,
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
