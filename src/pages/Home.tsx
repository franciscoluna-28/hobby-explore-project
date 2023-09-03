import { Button } from "../components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useActivitiesManager } from "../hooks/useActivityManager";
import RecommendedActivitiesSkeleton from "../components/skeleton/recommended-activities-skeleton";
import ErrorScreen from "../components/errors/error-screen";
import CategoryFilters from "../components/activities/ActivityCategoryFilters";
import { IPredefinedActivity } from "../types/default-activities";
import ActivityCard from "../components/activities/ActivityCard";

export default function Home() {
  const {
    selectedCategory,
    handleCategoryFilter,
    recommendedActivities,
    status,
    error,
    refetch,
  } = useActivitiesManager();

  console.log(recommendedActivities)

  // The API data is loading, render a skeleton
  if (status === "loading") {
    return <RecommendedActivitiesSkeleton numberOfActivities={6} />;
  }

  // The data didn't load correctly, render the error screen
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
    <AnimatePresence>
      <div>
        <h1 className="text-accent font-bold text-4xl">Discover Activities</h1>
        <CategoryFilters
          handleCategoryFilter={handleCategoryFilter}
          selectedCategory={selectedCategory}
        />
        <ul className="columns-1 sm:columns-2 w-full space-y-8 mt-8 lg:columns-3">
          {recommendedActivities &&
            recommendedActivities.map((activity: IPredefinedActivity) => (
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
