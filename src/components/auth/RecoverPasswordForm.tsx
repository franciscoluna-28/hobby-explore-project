import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
} from "../ui/form";
import z from "zod";
import { emailSchema } from "../../schemas/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFirebase } from "../../hooks/useFirebase";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import LoadingSpinner from "../ui/loading-spinner";

export default function RecoverPasswordForm() {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const { resetPassword, isLoading, error, success } = useFirebase();

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      await resetPassword(email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full xl:max-w-xl m-auto">
      <section className="bg-white !border-2 mt-4 border-gray-100 p-4 rounded-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="myuser@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center"></div>
            <Button className="w-full bg-accent hover:bg-black duration-200">
              {isLoading ? (
                <LoadingSpinner variant="contrast" />
              ) : (
                "Recover your Password"
              )}
            </Button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && !error && (
            <>
              <p className="text-green-500 mt-4">{success}</p>
            </>
          )}
        </Form>
      </section>
      <div className="mt-4 flex justify-center gap-4">
        <Link to="/login" className="text-sm font-bold hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
