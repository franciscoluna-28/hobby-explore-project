import create from 'zustand';

interface RatingStoreState {
  reviewsCount: number | null;
  averageRating: number | null;
  setReviewsAndAverageRating: (reviewsCount: number | null, averageRating: number | null) => void;
  incrementReviewCount: () => void;
}

const useRatingStore = create<RatingStoreState>((set) => ({
  reviewsCount: null,
  averageRating: null,
  setReviewsAndAverageRating: (reviewsCount, averageRating) => set({ reviewsCount, averageRating }),
  incrementReviewCount: () =>
    set((state) => ({
      reviewsCount: state.averageRating === 0 ? (state.reviewsCount !== null ? state.reviewsCount + 1 : 1) : state.reviewsCount,
      averageRating: state.averageRating,
    })),
}));

export default useRatingStore;
