import ActivityCard from "../components/activities/ActivityCard";
import ErrorScreen from "../components/errors/error-screen";
import RecommendedActivitiesSkeleton from "../components/skeleton/recommended-activities-skeleton";
import { Button } from "../components/ui/button";
import { useRecommendedDefaultActivities } from "../features/default-activities/api/use-get-random-default-activities";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  // Use the hook to get the default activities
  const {
    error,
    data: recommendedActivities,
    status,
    refetch,
  } = useRecommendedDefaultActivities();


  console.log(recommendedActivities)
  // The API data is loading, we render a skeleton
  if (status === "loading") {
    return <RecommendedActivitiesSkeleton numberOfActivities={6} />;
  }

  // The data didn't load correctly, we render the error screen
  if (error && status === "error") {
    return (
      <ErrorScreen
        message="Ooops. We weren't able to retrieve activities at the moment."
        children={
          <Button
            className="bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-white duration-200"
            onClick={() => refetch()}
          >
            Try Again
          </Button>
        }
      />
    );
  }

  return (
    // Entry animation
    <AnimatePresence>
      <div>
        <h1 className="text-accent w-full text-3xl lg:text-4xl font-bold">
          Activities for you
        </h1>

        <ul className="columns-1 sm:columns-2 w-full space-y-8 mt-8 lg:columns-3">
          {recommendedActivities &&
            recommendedActivities.map((activity) => (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={activity._id}
              >
                <ActivityCard {...activity} />
              </motion.li>
            ))}
        </ul>
      </div>
    </AnimatePresence>
  );
}
