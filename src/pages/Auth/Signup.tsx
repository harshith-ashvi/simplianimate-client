import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";

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
import { Checkbox } from "@/components/ui/checkbox";

import { useAuth } from "@/components/auth/Auth";

import GoogleIcon from "@/assets/svg/GoogleIcon";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Signup = () => {
  const { signinWithProvider, signup } = useAuth();
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (formData: FormValues) => {
    const { email, password } = formData;
    signup({ email, password });
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-3 ">
        <div className="w-auth-content p-8 border border-solid rounded-xl border-gray-200 shadow-lg">
          <p className="text-lg font-semibold ml-2 mb-4">
            Sign up to SimpliAnimate
          </p>
          <Button
            className="w-full my-3"
            variant="outline"
            onClick={signinWithProvider}
          >
            <GoogleIcon className="mr-2" />
            Sign up with Google
          </Button>
          <div className="flex items-center justify-center py-2">
            <hr className="w-8/12 mr-1" />
            <p className="w-full mx-2 text-sm text-gray-500">
              or sign up with email
            </p>
            <hr className="w-8/12 ml-1" />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Name<span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Naruto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormLabel className="text-black">
                      Password<span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={isTermsAgreed}
                  onCheckedChange={() => setIsTermsAgreed(!isTermsAgreed)}
                />
                <label htmlFor="terms" className="text-xs">
                  I agree with SimpliAnimate's{" "}
                  <Link to="/" className="underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={!isTermsAgreed}
              >
                Create an Account
              </Button>
            </form>
          </Form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
