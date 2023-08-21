import { axios } from "../axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const RATING_QUERY_KEY = "rating";

// Envío de Calificación
async function rateActivity(data: {
  uid: string;
  activityId: string;
  rating: number;
}): Promise<any> {
  try {
    const response = await axios.post("/rating/rate-activity", data);
    return response.data;
  } catch (error) {
    console.error("Error while rating activity:", error);
    throw new Error("An error occurred while rating the activity");
  }
}

export function useRateActivity() {
  return useMutation(
    (data: { uid: string; activityId: string; rating: number }) =>
      rateActivity(data)
  );
}

// Obtención de Calificación Actual del Usuario
async function getCurrentUserRating(data: {
  uid: string;
  activityId: string;
}): Promise<number | null> {
  try {
    const response = await axios.get(
      `${RATING_QUERY_KEY}/current-rating-in-activity/${data.uid}/${data.activityId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while getting current user rating:", error);
    throw new Error("An error occurred while getting the current rating");
  }
}

export function useGetCurrentUserRating(data: {
  uid: string;
  activityId: string;
}) {
  return useQuery<number | null>(
    ["currentRating", data.uid, data.activityId],
    () => getCurrentUserRating(data)
  );
}
