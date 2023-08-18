import { useMutation } from "@tanstack/react-query";
import { axios } from "../../axios";
import { IPredefinedActivityCard } from "../../../types/default-activities";

const QUERY_KEY = "user";

interface AddActivityToUserMutationResult {
  success: boolean;
  message: string;
}

async function addActivityToUserRequest(
  uid: string,
  activityData: IPredefinedActivityCard
): Promise<AddActivityToUserMutationResult> {
  try {
    const response = await axios.post(
      `${QUERY_KEY}/save-default-activity/${uid}`,
      activityData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "An error occurred while adding a new activity to the user"
    );
  }
}

export function useAddActivityToUser() {
  return useMutation(
    (data: { uid: string; activityData: IPredefinedActivityCard }) =>
      addActivityToUserRequest(data.uid, data.activityData),
    {
      // Aquí puedes manejar los efectos secundarios cuando la mutación está en proceso
      // onMutate: ...
      // Aquí puedes manejar los efectos secundarios cuando la mutación es exitosa
      // onSuccess: ...
    }
  );
}
