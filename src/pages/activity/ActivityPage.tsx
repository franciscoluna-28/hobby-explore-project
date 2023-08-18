import { useParams } from "react-router-dom";
import { useGetDefaultActivityDetails } from "../../features/default-activities/api/use-get-activity-info";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { BsPiggyBank } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { BsUniversalAccessCircle } from "react-icons/bs";
import CommentForm from "../../components/comments/CommentForm";

type Props = {
  id: string;
};

export default function ActivityPage() {
  // TODO add a hook for handling the form submit of a comment
  // TODO refactor the details into separated cards and components
  

  const { id } = useParams<Props>();

  const { data, isLoading, status } = useGetDefaultActivityDetails(id ?? "");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (status === "error" || !data) {
    return <p>Error!</p>;
  }

  return (
    <div className="flex flex-col m-auto">
      <img src={data.urls.regular} className="rounded-xl w-full m-auto"></img>

      <h1 className="text-accent font-bold text-3xl mt-8">{data.name}</h1>
      <span className="block text-sm my-2">Category:</span>
      <Badge className="w-min mt-2 p-2 bg-main/80 hover:bg-main text-mainDark">
        <span className="first-letter:capitalize">{data.type}</span>
      </Badge>
      <h2 className="text-accent text-xl mt-4 font-bold">Details</h2>

      <section className="mt-4 flex gap-2 flex-wrap">
        <Card className="w-min text-center">
          <CardHeader>
            <CardTitle>Accesible</CardTitle>
            <CardDescription className="flex gap-2 m-auto items-center">
              Accesibility{" "}
              <BsUniversalAccessCircle className="text-slate-500 text" />
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-min text-center">
          <CardHeader>
            <CardTitle>Cheap</CardTitle>
            <CardDescription className="flex gap-2 m-auto items-center">
              Cost <BsPiggyBank className="text-slate-500 text" />
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-min text-center">
          <CardHeader>
            <CardTitle>Alone</CardTitle>
            <CardDescription className="flex gap-2 m-auto items-center">
              Participants <BsPeople className="text-slate-500 text"></BsPeople>
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
      {/* 

      <h2 className="text-accent text-xl font-bold mt-6">Links</h2>
      <div className="flex gap-2 mt-4">
      <Card className="w-min">
 
          <CardHeader>  
            <CardTitle>Unsplash</CardTitle>
            <CardDescription className="flex gap-2 m-auto items-center"><a className="hover:underline underline-offset-2" href="https://unsplash.com/es">https://unsplash.com/es </a></CardDescription>
          </CardHeader>
        </Card>
      <Card className="w-min">
 
          <CardHeader>
            <CardTitle>React Icons</CardTitle>
            <CardDescription className="flex gap-2 m-auto items-center"><a className="hover:underline underline-offset-2" href="https://unsplash.com/es">https://react-icons.github.io/react-icons</a></CardDescription>
          </CardHeader>
        </Card>
        </div> */}
      <p className="leading-loose mt-4">
        {!data.description ? (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dictum
            tellus in facilisis condimentum. Ut eu nunc consequat, viverra
            ligula in, pretium nisi. Duis maximus lobortis vulputate. Aenean
            quis vestibulum ipsum. Sed sed vestibulum mi, a interdum lacus. Sed
            fermentum blandit risus vitae elementum.
          </p>
        ) : (
          <p>{data.description}</p>
        )}
      </p>

      <hr className="my-4"></hr>
      <h2 className="text-xl text-accent">Add a Comment</h2>
      <CommentForm />
    </div>
  );
}