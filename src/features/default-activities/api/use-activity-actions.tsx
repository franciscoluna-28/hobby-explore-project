import { useMutation } from "@tanstack/react-query";
import { axios } from "../../axios";
/* 
const QUERY_KEY = "user"; */

interface AddActivityToUserMutationResult {
  success: boolean;
  message: string;
}

async function addActivityToUserRequest(
  uid: string,
  id: string
): Promise<AddActivityToUserMutationResult> {
  try {
    const response = await axios.post(
      `/activity/save-default-activity/${uid}`,
      { id } // Send the id as the request body
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "An error occurred while adding a new activity to the user"
    );
  }
}

export function useAddActivityToUser() {
  return useMutation((data: { uid: string; id: string }) =>
    addActivityToUserRequest(data.uid, data.id)
  );
}
