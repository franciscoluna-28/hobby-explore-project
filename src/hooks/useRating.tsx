import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import {
  useGetCurrentUserRating,
  useRateActivity,
} from "../features/ratings/use-get-current-rating";
import { queryClient } from "../lib/query-client-instance";

type Props = {
  activityId: string;
};

export const useRating = ({ activityId }: Props) => {
  const [rate, setRate] = useState<number | null>(null);
  const { currentUser } = useAuth();
  const rateActivityMutation = useRateActivity();
  const currentUserRatingQuery = useGetCurrentUserRating({
    uid: currentUser?.uid!,
    activityId,
  });

  const handleRateActivity = async (rating: number) => {
    try {
      const response = await rateActivityMutation.mutateAsync({
        uid: currentUser?.uid || "",
        activityId,
        rating,
      });
      if (response) {
        setRate(rating);
        queryClient.invalidateQueries([
          "currentRating",
          currentUser?.uid!,
          activityId,
        ]);
      }
    } catch (error) {
      console.error("Error while rating activity:", error);
    }
  };

  useEffect(() => {
    if (!currentUserRatingQuery.isSuccess) return;

    setRate(
      currentUserRatingQuery.data !== null ? currentUserRatingQuery.data : null
    );
  }, [currentUserRatingQuery.isSuccess, currentUserRatingQuery.data]);

  return { rate, handleRateActivity };
};
