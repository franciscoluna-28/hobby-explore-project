import { useToast } from "../components/ui/use-toast";
import { useAddActivityToUser } from "../features/default-activities/api/use-activity-actions";
import { useIsActivitySavedByUser } from "../features/default-activities/api/use-get-activity-saved-state";
import useActivitiesStore from "../store/random-activities-store";
import { IPredefinedActivity } from "../types/default-activities";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";

export function useActivityActions(id: string) {
  const { currentUser } = useAuth();
  const { uid } = currentUser!;
  const { toast } = useToast();

  const { data } = useIsActivitySavedByUser(uid, id);
  const addActivityToUserMutation = useAddActivityToUser();

  const [isSaved, setIsSaved] = useState(data?.valueOf());

  const saveActivity = async (activityData: IPredefinedActivity) => {
    try {
      console.log(id);
      await addActivityToUserMutation.mutateAsync({
        uid: currentUser!.uid,
        id,
      });
      useActivitiesStore.setState((state) => ({
        savedRecommendedActivities: [
          ...state.savedRecommendedActivities,
          activityData,
        ],
      }));

      // Log the savedRecommendedActivities to verify if they're being saved successfully
      console.log(
        "Saved Activities:",
        useActivitiesStore.getState().savedRecommendedActivities
      );

      toast({
        title: "✅ Activity Saved Successfully",
        description: "You've added a new activity to your list!",
      });
      console.log(isSaved);
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };

  useEffect(() => {
    setIsSaved(data?.valueOf()); // Update the saved state on data change
  }, [data]);

  return {
    isSaved,
    saveActivity,
  };
}
