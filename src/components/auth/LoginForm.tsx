import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schemas/form";
import ContinueWithGoogle from "./ContinueWithGoogle";
import LoadingSpinner from "../ui/loading-spinner";
import { useFirebase } from "../../hooks/useFirebase";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { Link, Navigate } from "react-router-dom";

export default function LoginForm() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // TODO: change this to a useEffect function
  if (currentUser !== null) {
    () => navigate("/home");
  }

  const {
    isLoading,
    error,
    success,
    loginWithEmailAndPassword,
    continueWithGoogle,
  } = useFirebase();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (
    values,
    event
  ) => {
    event!.preventDefault();
    loginWithEmailAndPassword(values.email, values.password);
  };

  return (
    <div className="w-full xl:max-w-4xl m-auto">
      <ContinueWithGoogle
        continueWithGoogle={continueWithGoogle}
        disabled={isLoading}
      />
      <section className="bg-white !border-2 mt-4 border-gray-100 p-4 rounded-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password in here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-around">
              <Link className="text-sm" to="/">
                Don't have an account?{" "}
                <span className="font-bold text-sm">Register Here</span>
              </Link>
              <Link className="text-sm font-bold" to="/recover-password">
                Recover your password Here{" "}
              </Link>
            </div>
            <Button
              className="w-full bg-accent hover:bg-black duration-200"
              onClick={form.handleSubmit(onSubmit)}
            >
              {isLoading ? (
                <LoadingSpinner variant="contrast" />
              ) : (
                <span>Login</span>
              )}
            </Button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && !error && (
            <>
              <Navigate replace={false} to="/home"></Navigate>
              <p className="text-green-500 mt-4">{success}</p>
            </>
          )}
        </Form>
      </section>
    </div>
  );
}
