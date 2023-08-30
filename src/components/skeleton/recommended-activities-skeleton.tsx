import { Skeleton } from "../ui/skeleton";
import ActivitySkeleton from "./activity-skeleton";

type Props = {
  numberOfActivities: number;
};

export default function RecommendedActivitiesSkeleton({
  numberOfActivities,
}: Props) {
  return (
    <div className="flex flex-wrap h-screen m-auto ">
      <Skeleton className="w-64 h-12 bg-slate-300" />
      <div className="columns-1 sm:columns-2 w-full h-min space-y-8 mt-8 lg:columns-3">
        {Array.from({ length: numberOfActivities }).map((_, index) => (
          <ActivitySkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
