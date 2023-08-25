import { Skeleton } from "../ui/skeleton";
import ActivitySkeleton from "./activity-skeleton";

type Props = {
  numberOfActivities: number;
};

export default function RecommendedActivitiesSkeleton({
  numberOfActivities,
}: Props) {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-48 h-12" />
      <div className="columns-1 space-y-8 sm:columns-2 w-full mt-8 lg:columns-3">
        {Array.from({ length: numberOfActivities }).map((_, index) => (
          <ActivitySkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
