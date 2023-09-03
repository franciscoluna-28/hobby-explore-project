import { FaStar } from "react-icons/fa";

const RatingOnlyVisible = ({
  averageRating,
  totalRatings,
}: {
  averageRating: number;
  totalRatings: number;
}) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const givenRating = index + 1;

        return (
          <label
            key={givenRating}
            className="duration-300"
          >
            <FaStar
              className="text-lg my-2 duration-200"
              color={givenRating <= averageRating ? "#fdc500" : "rgb(192,192,192)"}
            />
          </label>
        );
      })}
      {totalRatings === 0 ? (
        <p className="ml-2 text-sm text-gray-600">No ratings yet</p>
      ) : (
        <p className="ml-2 text-sm text-gray-600">
          {averageRating.toFixed(1)} ({totalRatings} {totalRatings === 1 ? "rating" : "ratings"})
        </p>
      )}
    </div>
  );
};

export default RatingOnlyVisible;
