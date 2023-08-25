/* import { useInfiniteQuery } from "@tanstack/react-query";
import { axios } from "../axios";

const QUERY_KEY = "user";

async function getUserDefaultActivities({ uid, pageParam = 1 }): Promise<any> {
  const { data } = await axios.get(`/${QUERY_KEY}/default-activities/${uid}?page=${pageParam}`);
  return data;
}

export function useGetUserDefaultActivities(uid: string) {
  return useInfiniteQuery(
    ["userActivities", uid],
    ({ pageParam = 1 }) => getUserDefaultActivities({ uid, pageParam }), // Pass the uid and pageParam
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  );
}
 */