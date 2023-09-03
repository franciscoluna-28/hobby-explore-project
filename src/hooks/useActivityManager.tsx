import {
  useRecommendedDefaultActivities,
  useRecommendedDefaultActivitiesByCategory,
} from "../features/default-activities/api/use-get-random-default-activities";
import useActivitiesStore from "../store/random-activities-store";
import { BoredAPIActivityType } from "../types/default-activities";

export function useActivitiesManager() {
  const selectedCategory = useActivitiesStore((state) => state.selectedKeyword);

  const setRecommendedActivities = useActivitiesStore(
    (state) => state.setRecommendedActivities
  );

  const handleCategoryFilter = (category: BoredAPIActivityType) => {
    useActivitiesStore.setState({ selectedKeyword: category });
  };

  const getActivitiesQuery = () => {
    return selectedCategory === "all"
      ? useRecommendedDefaultActivities()
      : useRecommendedDefaultActivitiesByCategory(selectedCategory);
  };

  const activitiesQuery = getActivitiesQuery();
  const {
    data: recommendedActivities,
    status,
    error,
    refetch,
  } = activitiesQuery;

  setRecommendedActivities(recommendedActivities);

  return {
    selectedCategory,
    handleCategoryFilter,
    recommendedActivities,
    status,
    error,
    refetch,
  };
}
