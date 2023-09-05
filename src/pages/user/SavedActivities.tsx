import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useIntersection } from "@mantine/hooks";
import { axios } from "../../features/axios";
import ActivityCard from "../../components/activities/ActivityCard";
import { IPredefinedActivity } from "../../types/default-activities";
import RecommendedActivitiesSkeleton from "../../components/skeleton/recommended-activities-skeleton";
import ErrorScreen from "../../components/errors/error-screen";
import { Button } from "../../components/ui/button";
import useActivitiesStore from "../../store/random-activities-store";

function SavedActivities() {
  // UID obtained through the params to get the user activities data
  const { uid } = useParams();

  // Get the total default activities from the store
  const totalDefaultActivities = useActivitiesStore((state) => state.totalDefaultActivities);
/*   const recommendedActivities = useActivitiesStore((state) => state.totalDefaultActivities); */

  // Function to fetch saved activities from the server
  const fetchSavedActivities = (page: number) =>
    axios.get(`/activity/user-activities/${uid}?page=${page}`).then((res) => res.data);

  const {
    data,
    isSuccess,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["savedActivities"],
    queryFn: ({ pageParam = 1 }) => fetchSavedActivities(pageParam),
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
    if (
      entry?.isIntersecting &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isLoading &&
      !isError
    ) {
      fetchNextPage();
    }
  }, [entry]);

  // Access the correct data structure
  const activities = data?.pages.flatMap((page) => page.docs) || [];

  if (isSuccess && activities.length > 0) {
    // Concatenate the newly fetched activities with the ones from the store
    const mergedActivities = [...totalDefaultActivities, ...activities];

    // Set the merged activities in the store
    useActivitiesStore.setState({ totalDefaultActivities: mergedActivities });
  }

  if (activities.length === 0) {
    return (
      <ErrorScreen
        message="You don't have saved activities yet!"
        children={
          <Link
            className="p-4 hover:bg-accent hover:text-white duration-200 text-sm border-2 rounded-xl border-accent"
            to="/home"
          >
            Start by Saving Some
          </Link>
        }
      />
    );
  }

  return (
    <div>
      {isLoading ? (
        <RecommendedActivitiesSkeleton numberOfActivities={6} />
      ) : isError ? (
        <ErrorScreen
          message="Oops. We couldn't load your activities. Want to give us another try?"
          children={
            <Button
              className="bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-white duration-200"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          }
        />
      ) : (
        <>
          <h1 className="font-bold text-4xl">My Activities</h1>
          <div className="columns-1 sm:columns-2 w-full space-y-8 mt-8 lg:columns-3">
            {activities.map((activity: IPredefinedActivity) => (
              <ActivityCard key={activity._id} {...activity} />
            ))}
            <div ref={ref}></div>
          </div>
        </>
      )}
      <button
        className="hidden"
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage || isLoading || !hasNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing More to Load"}
      </button>
    </div>
  );
}

export default SavedActivities;
