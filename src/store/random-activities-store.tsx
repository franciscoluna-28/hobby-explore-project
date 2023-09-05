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
  saveRecommendedActivity: (activity: IPredefinedActivity, state: State) => void; // Pass state as a parameter
  setSavedActivities: (activity: IPredefinedActivity[]) => void;
  setTotalDefaultActivities: (activities: IPredefinedActivity[]) => void; // New action
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
  
    // Calculate the total default activities (savedRecommendedActivities + userSavedDefaultActivities)
    const totalActivities = [...state().savedRecommendedActivities, ...state().userSavedDefaultActivities];
    set({ totalDefaultActivities: totalActivities }); // Update total default activities
  },

  setSavedActivities: (activities) =>
    set({ userSavedDefaultActivities: activities }),

  setTotalDefaultActivities: (activities) =>
    set({ totalDefaultActivities: activities }), // Set the total default activities separately
}));

export default useActivitiesStore;
