import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useIntersection } from "@mantine/hooks";
import { axios } from "../../features/axios";
import ActivityCard from "../../components/activities/ActivityCard";
import { IPredefinedActivity } from "../../types/default-activities";

function SavedActivities() {

  // UID obtained through the params to get the user activities data
  const { uid } = useParams();

  // Getting the saved activities from an user
  const fetchSavedActivities = (page: number) =>
    axios.get(`/user/default-activities/${uid}?page=${page}`).then((res) => res.data);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["savedActivities"],
      queryFn: ({ pageParam = 1}) => fetchSavedActivities(pageParam),
      getNextPageParam: (lastPage, allPages) => {
  if (lastPage && lastPage.length === 0) {
    return null; // No more data to load
  }
  return allPages.length + 1; // Increase the page number
},

    });

  // Saving the ref of the last activity
  const lastActivityRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastActivityRef.current,
    threshold: 1,
  });

  // Detecting the intersection by checking the last activity 
  // This way the infinite scrolling behavior will work properly
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage && !isLoading && !isError) {
      fetchNextPage();
    }
  }, [entry]);

  const activities = data?.pages.flatMap((page) => page) || [];

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div className="columns-1 sm:columns-2 w-full space-y-8 mt-8 lg:columns-3">
          {activities.map((activity: IPredefinedActivity, i) => (
            <ActivityCard key={activity.id} {...activity} />
          ))}
          <div ref={ref}></div>
        </div>
      )}
      <button className="" onClick={() => fetchNextPage()} disabled={isFetchingNextPage || isLoading || !hasNextPage}>
        {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing More to Load"}
      </button>
    </div>
  );
}

export default SavedActivities;
