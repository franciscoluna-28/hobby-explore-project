import { create } from "zustand";
import { BoredAPIActivityType, IPredefinedActivity } from "../types/default-activities";

type State = {
  recommendedActivities: IPredefinedActivity[];
  selectedKeyword: BoredAPIActivityType;
  savedRecommendedActivities: IPredefinedActivity[];
  userSavedDefaultActivities: IPredefinedActivity[];
  totalDefaultActivities: IPredefinedActivity[]; // New state for total default activities
};

type Actions = {
  setRecommendedActivities: (activities: IPredefinedActivity[]) => void;
  setSelectedKeyword: (keyword: BoredAPIActivityType) => void;
  saveRecommendedActivity: (activity: IPredefinedActivity) => void;
  setSavedActivities: (activity: IPredefinedActivity[]) => void;
  setTotalDefaultActivities: (activity: IPredefinedActivity[]) => void;
};

const useActivitiesStore = create<State & Actions>((set, state) => ({
  recommendedActivities: [],
  selectedKeyword: "all",
  savedRecommendedActivities: [],
  userSavedDefaultActivities: [],
  totalDefaultActivities: [], // Initialize total default activities as an empty array



  setRecommendedActivities: (activities) =>
    set({ recommendedActivities: activities }),

  setSelectedKeyword: (keyword) =>
    set({ selectedKeyword: keyword }),

  saveRecommendedActivity: (activity) => {
    set((prevState) => ({
      savedRecommendedActivities: [...prevState.savedRecommendedActivities, activity],
    }));
  },

  setSavedActivities: (activities) =>
    set({ userSavedDefaultActivities: activities }),

  // Merge and set the total default activities
  setTotalDefaultActivities: () => {
    const totalActivities = [
      ...state().savedRecommendedActivities,
      ...state().userSavedDefaultActivities,
    ];
    set({ totalDefaultActivities: totalActivities });
  },
}));

export default useActivitiesStore;
