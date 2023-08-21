import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useGetCurrentUserRating, useRateActivity } from "../../features/ratings/use-get-current-rating";
import { queryClient } from "../../lib/query-client-instance";

const Rate = ({ activityId }: { activityId: string }) => {
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
        queryClient.invalidateQueries(["currentRating", currentUser?.uid!, activityId]);
      }
    } catch (error) {
      console.error("Error while rating activity:", error);
    }
  };

  useEffect(() => {
    if (
      currentUserRatingQuery.isSuccess &&
      currentUserRatingQuery.data !== null
    ) {
      setRate(currentUserRatingQuery.data);
    } else {
      setRate(null);
    }
  }, [currentUserRatingQuery.isSuccess, currentUserRatingQuery.data]);

  return (
    <div className="flex mt-8">
      {Array.from({ length: 5 }, (_, index) => index + 1).map((givenRating) => (
        <label
          key={givenRating}
          className="cursor-pointer transition-colors duration-300"
        >
          <input
            type="radio"
            className="hidden"
            name="rating"
            value={givenRating}
            onClick={() => {
              handleRateActivity(givenRating);
            }}
          />
          <FaStar
            className="text-4xl duration-200"
            color={givenRating <= rate! ? "#fdc500" : "rgb(192,192,192)"}
          />
        </label>
      ))}
    </div>
  );
};

export default Rate;
