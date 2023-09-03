import { axios } from "../axios";
import { useQuery } from "@tanstack/react-query";
import useRatingStore from "../../store/review-store";

async function getReviewsAndAverageRating() {
  try {
    const response = await axios.get("/get-reviews-and-average-rating");
    const { reviewsCount, averageRating } = response.data;

    // Upda the respective state of Zustand of the rating system
    useRatingStore.setState({ reviewsCount, averageRating });
    return response.data;
  } catch (error) {
    console.error("Error while fetching reviews and average rating:", error);
    throw new Error(
      "An error occurred while fetching reviews and average rating"
    );
  }
}

export function useGetReviewsAndAverageRating() {
  return useQuery(["reviewsAndAverageRating"], getReviewsAndAverageRating, {});
}
