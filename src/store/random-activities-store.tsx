import { create } from "zustand";
import { BoredAPIActivityType, IPredefinedActivity } from "../types/default-activities";

type State = {
  recommendedActivities: IPredefinedActivity[];
  selectedKeyword: BoredAPIActivityType;
};

type Actions = {
  setRecommendedActivities: (activities: IPredefinedActivity[]) => void;
  setSelectedKeyword: (keyword: BoredAPIActivityType) => void;
};

const useActivitiesStore = create<State & Actions>((set) => ({
  recommendedActivities: [],
  selectedKeyword: "all",

  setRecommendedActivities: (activities) =>
    set({ recommendedActivities: activities }),

  setSelectedKeyword: (keyword) =>
    set({ selectedKeyword: keyword }),
}));

export default useActivitiesStore;
