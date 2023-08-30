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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schemas/form";
import ContinueWithGoogle from "./ContinueWithGoogle";
import LoadingSpinner from "../ui/loading-spinner";
import { useFirebase } from "../../hooks/useFirebase";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RegisterForm() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();


  const {
    isLoading,
    error,
    success,
    signUpWithEmailAndPassword,
    continueWithGoogle,
  } = useFirebase();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signUpWithEmailAndPassword(values.email, values.password);
  };

  // Fix unvalid rendering by using the useEffect hook
  useEffect(() => {
    console.log("useEffect running!")
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, success]);

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
            <div className="">
              <Link className="text-sm" to="/login">
                Already have an account?{" "}
                <span className="font-bold text-sm">Login Here</span>
              </Link>
            </div>
            <Button
              className="w-full bg-accent hover:bg-black duration-200"
              onClick={form.handleSubmit(onSubmit)}
            >
              {isLoading ? (
                <LoadingSpinner variant="contrast" />
              ) : (
                <span>Register</span>
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
    </div>
  );
}
