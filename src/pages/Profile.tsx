import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { auth } from "../firebase";
import Dog from "../assets/dog.jpg";
import BarChartSection from "../components/ui/Barchart";
import { useGetGlobalFavoriteCategories } from "../features/user-actions/api/use-get-user-stats";
import { CategoryInformation } from "../types/stats";
import { Button } from "../components/ui/button";
import { useFirebase } from "../hooks/useFirebase";
import ContinueWithGoogle from "../components/auth/ContinueWithGoogle";
import UserDescription from "../components/profile/user-description";
import { useParams } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import usePagination from "../hooks/usePagination";
import { axios } from "../features/axios";
import RecommendedActivitiesSkeleton from "../components/skeleton/recommended-activities-skeleton";
import ErrorScreen from "../components/errors/error-screen";
import { IPredefinedActivity } from "../types/default-activities";
import ActivityCard from "../components/activities/ActivityCard";
import { ICustomActivity } from "../types/custom-activities";

export type FavoriteCategories = Array<{
  name: string;
  Total: number;
}>;

// Current user will have its own page
export default function Profile() {
  const { uid } = useParams();

  const fetchSavedActivities = (page: number) =>
    axios
      .get(`/activity/custom-activities/${uid}?page=${page}`)
      .then((res) => res.data
      );


  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    ref,
  } = usePagination(fetchSavedActivities, "userActivities");

  // Add this condition to load activities only when data is available
  const activities = data?.pages.flatMap((page: any) => page.docs) || [];

  console.log(activities);

  const favoriteCategoriesQuery = useGetGlobalFavoriteCategories(uid!);

  const favoriteCategories = favoriteCategoriesQuery.data;
  const { handleLogout, continueWithGoogle } = useFirebase();

  const getChartData = (): FavoriteCategories => {
    if (!favoriteCategories) {
      return [];
    }

    return favoriteCategories.map((category: CategoryInformation) => ({
      name: category.category,
      Total: category.count,
    }));
  };

  return (
    <main className="flex justify-center flex-col items-center m-auto">
      <Tabs defaultValue="password" className="w-[400px] m-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">My Account</TabsTrigger>
          <TabsTrigger value="password">My Activities</TabsTrigger>
        </TabsList>

        <TabsContent
          value="account"
          className="m-auto flex justify-center flex-col items-center mt-4"
        >
          <h1 className="font-bold text-accent text-4xl">User Profile</h1>
          <h2>{auth.currentUser?.email}</h2>
          <Avatar className="w-32 h-32 border-black border-2 p-1 hover:p-0 hover:scale-105 duration-200 mt-4">
            <AvatarImage
              className="rounded-full"
              src={auth.currentUser?.photoURL ?? Dog}
            />

            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <h2 className="text-accent font-bold text-xl mt-4">
            {auth.currentUser?.displayName ?? "Anonymous User"}
          </h2>
          <h2 className="text-center my-2">
            Created at {auth.currentUser?.metadata.creationTime}
          </h2>
          {!auth.currentUser?.photoURL && !auth.currentUser?.displayName ? (
            <>
              <p className="text-slate-500 text-center text-sm mt-2 max-w-lg leading-relaxed">
                You're considered an anonymous user when you're not logged in
                with Google. Sign in with Google to display your information.
              </p>
              <ContinueWithGoogle
                className="mt-4"
                continueWithGoogle={continueWithGoogle}
                disabled={false}
              />
            </>
          ) : null}
          <UserDescription uid={uid!} />
          <BarChartSection data={getChartData()} />
          <Button className="mt-4" variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
          {/*       <p>Make Account Private</p>
      <Switch className="bg-red-500"></Switch>



      <Button variant="destructive">Delete Account</Button> */}
        </TabsContent>

        <TabsContent
          value="password"
          className="m-auto flex justify-center flex-col items-center mt-4"
        >
          <div>
            {isLoading ? (
              <RecommendedActivitiesSkeleton numberOfActivities={6} />
            ) : isError ? (
              <ErrorScreen
                message="Oops. We couldn't load your activities. Want to give us another try?"
                children={
                  <Button
                    className="bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-white duration-200"
                    onClick={() => refetch()}
                  >
                    Try Again
                  </Button>
                }
              />
            ) : (
              <>
                <h1 className="font-bold text-4xl">My Activities</h1>
                <div className="columns-1 sm:columns-2 w-full space-y-8 mt-8 lg:columns-3">
      {/*              {activities.map((activity: ICustomActivity) => (
                      <li key={activity._id}>{activity.name}</li>
                    ))} */}
                </div>
                <button
                className="hidden"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage || isLoading || !hasNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load More"
                  : "Nothing More to Load"}
              </button>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
