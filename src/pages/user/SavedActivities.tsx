import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { axios } from "../../features/axios";
import ActivityCard from "../../components/activities/ActivityCard";
import { IPredefinedActivity } from "../../types/default-activities";
import RecommendedActivitiesSkeleton from "../../components/skeleton/recommended-activities-skeleton";
import ErrorScreen from "../../components/errors/error-screen";
import { Button } from "../../components/ui/button";
import useActivitiesStore from "../../store/random-activities-store";
import usePagination from "../../hooks/usePagination";

function SavedActivities() {
  const { uid } = useParams();

  const {
    savedRecommendedActivities,
    totalDefaultActivities,
    setTotalDefaultActivities,
  } = useActivitiesStore((state) => ({
    userSavedDefaultActivities: state.userSavedDefaultActivities,
    savedRecommendedActivities: state.savedRecommendedActivities,
    totalDefaultActivities: state.totalDefaultActivities,
    setTotalDefaultActivities: state.setTotalDefaultActivities,
  }));

  const fetchSavedActivities = (page: number) =>
    axios
      .get(`/activity/user-activities/${uid}?page=${page}`)
      .then((res) => res.data);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    ref,
  } = usePagination(fetchSavedActivities, "savedActivities"); // Use the usePagination hook

  const activities = data?.pages.flatMap((page: any) => page.docs) || [];

  // Save the fetched activities to the store and update totalDefaultActivities
  useEffect(() => {
    if (data?.pages) {
      useActivitiesStore.setState((state) => ({
        ...state,
        userSavedDefaultActivities: activities,
      }));

      // Calculate totalDefaultActivities and update it
      const newTotalDefaultActivities = [
        ...savedRecommendedActivities,
        ...activities,
      ];
      setTotalDefaultActivities(newTotalDefaultActivities);
    }
  }, [data, savedRecommendedActivities]);

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
            {totalDefaultActivities.map((activity: IPredefinedActivity) => (
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
