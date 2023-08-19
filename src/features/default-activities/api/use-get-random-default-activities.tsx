import { useQuery } from "@tanstack/react-query"; // Asegúrate de importar useQuery desde la biblioteca correcta
import { axios } from "../../axios";
import { IPredefinedActivityCard } from "../../../types/default-activities";

// API common endpoint
// This is temporary and just to test the cards
const QUERY_KEY = "activity/three-activities-from-db-with-type";

// Gets 3 random activities from the Hobby Explore API
async function getRecommendedDefaultActivities(): Promise<IPredefinedActivityCard[]> {
  const { data } = await axios.get(`/${QUERY_KEY}?type=${"relaxation"}`);
  return data;
}

// Gets 3 random activities within a category
export function useRecommendedDefaultActivities() {
  return useQuery(["recommendedActivities"], () =>
    getRecommendedDefaultActivities()
  );
}

export function useRecommendedDefaultActivitiesByCategory(category: string) {
  return useQuery(["recommendedActivities", category], () =>
    getRecommendedDefaultActivitiesByCategory(category)
  );
}

async function getRecommendedDefaultActivitiesByCategory(category: string) {
  const { data } = await axios.get(`/${QUERY_KEY}/${category}`);
  return data;
}
