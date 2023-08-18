import { useQuery } from "@tanstack/react-query"; // Import react-query hook
import { axios } from "../../axios";
import { IPredefinedActivity } from "../../../types/default-activities";


const QUERY_KEY = "activity";

async function getDefaultActivityDetails(id: string): Promise<IPredefinedActivity> {
  try {
    console.log(id)
    const { data } = await axios.get(`${QUERY_KEY}/activity-by-id/${id}`);
    return data;
  } catch (error) {
    throw new Error("Error fetching activity details");
  }
}

export function useGetDefaultActivityDetails(activityId: string) {
  return useQuery(["activityDetails", activityId], () =>
    getDefaultActivityDetails(activityId)
  );
}
