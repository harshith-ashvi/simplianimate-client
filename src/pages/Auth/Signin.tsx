import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, Navigate } from "react-router-dom";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/components/auth/Auth";

import GoogleIcon from "@/assets/svg/GoogleIcon";

type FormValues = {
  email: string;
  password: string;
};

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Signin = () => {
  const { user, signin, signinWithProvider, loading, errorMessage } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (user) {
      <Navigate to="/" />;
    }
  }, []);

  const onSubmit = async (formData: FormValues) => signin(formData);

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-3 ">
        <div className="max-w-auth-content min-w-[390px] sm:w-auth-content  mx-2 p-8 border border-solid rounded-xl border-gray-200 shadow-lg">
          <p className="text-lg font-semibold ml-2 mb-4">
            Sign into SimpliAnimate
          </p>
          <Button
            className="w-full my-3"
            variant="outline"
            onClick={signinWithProvider}
          >
            <GoogleIcon className="mr-2" />
            Sign in with Google
          </Button>
          <div className="flex items-center justify-center py-2">
            <hr className="w-8/12 mr-1" />
            <p className="w-full mx-2 text-sm text-gray-500">
              or sign in with email
            </p>
            <hr className="w-8/12 ml-1" />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Email<span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="naruto@konoha.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-black">
                        Password<span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <Link to="/forgot-password" className="underline text-sm">
                        Forgot?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errorMessage && (
                <div className="flex items-center justify-start">
                  <X size={20} color="red" />
                  <p className="text-red-500 text-sm ml-2">{errorMessage}</p>
                </div>
              )}
              <Button type="submit" className="w-full mt-2" disabled={loading}>
                Sign In
              </Button>
            </form>
          </Form>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
