export function calculateNewAverageRating(
    reviewsCount: number | null,
    currentAverageRating: number | null,
    newRating: number
  ): number {
    if (!currentAverageRating) {
      return newRating;
    }
  
    const totalRatings = reviewsCount || 0;
    const currentTotalRating = currentAverageRating * totalRatings;
  
    const newTotalRatings = totalRatings + 1;
    const newTotalRating = currentTotalRating + newRating;
  
    return newTotalRating / newTotalRatings;
  }
  