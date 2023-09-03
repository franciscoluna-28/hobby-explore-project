import { useToast } from "../components/ui/use-toast";
import { useAddActivityToUser } from "../features/default-activities/api/use-activity-actions";
import { useIsActivitySavedByUser } from "../features/default-activities/api/use-get-activity-saved-state";
import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";

export function useActivityActions(id: string) {
  const { currentUser } = useAuth();
  const { uid } = currentUser!;
  const { toast } = useToast();


  const { data, refetch } = useIsActivitySavedByUser(uid, id);
  const addActivityToUserMutation = useAddActivityToUser();

  const [isSaved, setIsSaved] = useState(data?.valueOf());

  // TODO: This should be in a store tbh
  const saveActivity = async (id: string) => {
    try {
      console.log(id);
      await addActivityToUserMutation.mutateAsync({
        uid: currentUser!.uid,
        id,
      });
      refetch(); // Refresh the saved state after successful save
      toast({
        title: "✅ Activity Saved Successfully",
        description: "You've added a new activity to your list!",
      });
      console.log(isSaved);
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };

  // TODO: Use a store to remove this dependency and do less API requests
  // TODO: What am I even doing?
  // TODO: I think I should stat selling minecraft mods instead of doing web applications
  // TODO: Quit this fullstack thing (But wait I have to buy a Porsche with it lol)
  // With this we can create updates in real time instead of hardcoding the useEffect LOL
  useEffect(() => {
    setIsSaved(data?.valueOf()); // Update the saved state on data change
  }, [data]);

  return {
    isSaved,
    saveActivity,
  };
}
