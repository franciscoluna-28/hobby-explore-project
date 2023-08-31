import { useQuery } from "@tanstack/react-query";
import { axios } from "../../axios";

const QUERY_KEY = "activity";

async function getIsActivitySavedByUser(
  uid: string,
  id: string
): Promise<boolean> {
  const { data } = await axios.get(
    `${QUERY_KEY}/is-saved/${uid}?activityId=${id}`
  );
  return data.isSaved;
}

export function useIsActivitySavedByUser(uid: string, activityId: string) {
  return useQuery(["isActivitySaved", uid, activityId], () =>
    getIsActivitySavedByUser(uid, activityId)
  );
}
