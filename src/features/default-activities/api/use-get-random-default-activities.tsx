import { useQuery } from "@tanstack/react-query"; // Asegúrate de importar useQuery desde la biblioteca correcta
import { axios } from "../../axios";
import { IPredefinedActivity } from "../../../types/default-activities";

// API common endpoint
// This is temporary and just to test the cards
const QUERY_KEY = "activity/random";

// Gets 3 random activities from the Hobby Explore API
async function getRecommendedDefaultActivities(): Promise<IPredefinedActivity[]> {
  const { data } = await axios.get(`/${QUERY_KEY}`);
  return data;
}
async function getRecommendedDefaultActivitiesFromDB(type: string): Promise<IPredefinedActivity[]> {
  const { data } = await axios.get(`activity/three-activities-from-db-with-type?type=${type}`);
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

export function useRecommendedDefaultActivitiesByCategoryFromDB(category: string) {
  return useQuery(["recommendedActivitiesWithCategoryDB", category], () =>
    getRecommendedDefaultActivitiesFromDB(category)
  );
}

async function getRecommendedDefaultActivitiesByCategory(category: string) {
  const { data } = await axios.get(`/${QUERY_KEY}?type=${category}`);
  return data;
}

// I don't even know how this works well
`?type=${"relaxation"}`