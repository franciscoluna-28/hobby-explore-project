import { useAddActivityToUser } from "../features/default-activities/api/use-activity-actions";
import { useIsActivitySavedByUser } from "../features/default-activities/api/use-get-activity-saved-state";
import { IPredefinedActivityCard } from "../types/default-activities";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";

export function useActivityActions(id: string) {
  const { currentUser } = useAuth();
  const { uid } = currentUser!;

  const { data, refetch } = useIsActivitySavedByUser(uid, id);
  const addActivityToUserMutation = useAddActivityToUser();

  const [isSaved, setIsSaved] = useState(data?.valueOf());

  const saveActivity = async (activityData: IPredefinedActivityCard) => {
    try {
      await addActivityToUserMutation.mutateAsync({
        uid: currentUser!.uid,
        activityData,
      });
      refetch(); // Refresh the saved state after successful save
      console.log(isSaved)
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
