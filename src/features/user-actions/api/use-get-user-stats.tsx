import { CategoryInformation } from "../../../types/stats";
import { axios } from "../../axios";
import { useQuery } from "@tanstack/react-query";

const QUERY_KEY = "user/global";

// Returns the favorite categories of a user
async function getGlobalFavoriteCategories(uid: string): Promise<CategoryInformation[]> {
  const { data } = await axios.get(`/${QUERY_KEY}-favorite-categories/${uid}`);
  return data;
}
/* async function getGlobalStats(uid: string): Promise<> {
  const { data } = await axios.get(`/${QUERY_KEY}-stats/${uid}`);
  return data;
} */

export function useGetGlobalFavoriteCategories(uid: string) {
  return useQuery(["globalFavoriteCategories", uid], () =>
    getGlobalFavoriteCategories(uid)
  );
}
/* export function useGetGlobalStats(uid: string) {
  return useQuery(["globalFavoriteCategories", uid], () => getGlobalStats(uid));
}
 */