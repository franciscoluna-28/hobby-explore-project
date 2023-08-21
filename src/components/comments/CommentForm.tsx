import {
  Form,
  FormDescription,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
} from "../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import Dog from "../../assets/dog.jpg";
import {
  AvatarFallback,
  AvatarImage,
  Avatar,
} from "../../components/ui/avatar";
import { auth } from "../../firebase";
import { useAddNewComment } from "../../features/comments/api/use-activity-comments";
import { queryClient } from "../../lib/query-client-instance";

const FormSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: "Your description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 30 characters.",
    }),
});

// TODO add functionality
// TODO divide schemas and types
// TODO handle submit and mutations

type Props = {
  activityId: string;
};

export default function CommentForm({ activityId }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const addNewCommentMutation = useAddNewComment(); // Usar el hook de mutación

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // Ejecutar la mutación para agregar un comentario
      await addNewCommentMutation.mutateAsync({
        uid: auth.currentUser!.uid,
        activityId: activityId, // Puedes obtenerlo de donde corresponda
        commentText: data.description,
      });

      // Limpiar el formulario después de agregar el comentario
      form.setValue("description", "");
      queryClient.invalidateQueries(["commentsFromActivity", activityId]);
      
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  return (
    <div className="flex gap-2 mt-4">
      <Avatar>
        <AvatarImage
          className="h-12 w-12 rounded-full"
          src={auth.currentUser?.photoURL ?? Dog}
        />
        <AvatarFallback>User Picture</AvatarFallback>
      </Avatar>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-2/3 space-y-4"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tell us your thoughts on this activity"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="flex w-1/4" type="submit">
            Upload Comment
          </Button>
        </form>
      </Form>
    </div>
  );
}
