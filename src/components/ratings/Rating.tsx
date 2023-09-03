import { FaStar } from "react-icons/fa";
import useRatingStore from "../../store/review-store";
import { useRating } from "../../hooks/useRating";

const Rate = ({ activityId }: { activityId: string }) => {
  const { rate, handleRateActivity } = useRating({ activityId });
  const addRatingAndReview = useRatingStore((state) => state.incrementReviewCount); // Access the addRatingAndReview action from the store

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
              addRatingAndReview(); // Update the rating using the store action
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
