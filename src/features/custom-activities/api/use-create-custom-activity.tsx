import { useMutation } from "@tanstack/react-query";
import { axios } from "../../axios";
import { ICustomActivity } from "../../../types/custom-activities";

interface AddCustomActivityMutationResult {
  success: boolean;
  message: string;
}

async function addCustomActivityRequest(activityData: ICustomActivity): Promise<AddCustomActivityMutationResult> {
  try {
    const response = await axios.post("activity/custom-activities", activityData);
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while adding a new custom activity");
  }
}

export function useAddCustomActivity() {
  return useMutation((activityData: ICustomActivity) => addCustomActivityRequest(activityData));
}
