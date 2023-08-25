import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { auth } from "../firebase";
import Dog from "../assets/dog.jpg";
import BarChartSection from "../components/ui/Barchart";
import { useGetGlobalFavoriteCategories } from "../features/user-actions/api/use-get-user-stats";
import { CategoryInformation } from "../types/stats";
import { Button } from "../components/ui/button";
import { useFirebase } from "../hooks/useFirebase";
import ContinueWithGoogle from "../components/auth/ContinueWithGoogle";

export type FavoriteCategories = Array<{
  name: string;
  Total: number;
}>;

export default function Profile() {
  const favoriteCategoriesQuery = useGetGlobalFavoriteCategories(
    auth.currentUser?.uid ?? ""
  );

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
      <h2 className="text-center my-2">Created at {auth.currentUser?.metadata.creationTime}</h2>
      {!auth.currentUser?.photoURL && !auth.currentUser?.displayName ? (
        <>
        <p className="text-slate-500 text-center text-sm mt-2 max-w-lg leading-relaxed">You're considered an anonymous user when you're not logged in with Google. Sign in with Google to display your information.</p>
          <ContinueWithGoogle
            className="mt-4"
            continueWithGoogle={continueWithGoogle}
            disabled={false}
          />
        </>
      ) : null}
      <BarChartSection data={getChartData()} />
      <Button className="mt-4" variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
{/*       <p>Make Account Private</p>
      <Switch className="bg-red-500"></Switch>



      <Button variant="destructive">Delete Account</Button> */}
    </main>
  );
}
