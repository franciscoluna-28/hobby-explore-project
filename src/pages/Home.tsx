import ActivityCard from "../components/activities/ActivityCard";
import LoadingSpinner from "../components/ui/loading-spinner";
import { useRecommendedDefaultActivities } from "../features/default-activities/api/use-get-random-default-activities";

export default function Home() {
  const {
    error,
    data: recommendedActivities,
    status,
  } = useRecommendedDefaultActivities();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (error && status === "error") {
    return <p>Error!</p>;
  }

  console.log(recommendedActivities)

  return (
    <div>
      <h1 className="text-accent text-4xl font-bold">Activities for you</h1>

      <ul className="columns-3 mt-8">
        {recommendedActivities &&
          recommendedActivities.map((activity) => (
            <ActivityCard {...activity} key={activity.id} />
          ))}
      </ul>
    </div>
  );
}
