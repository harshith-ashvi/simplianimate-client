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
  email: string;
  password: string;
};

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const Signup = () => {
  const { signinWithProvider, signup } = useAuth();
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (formData: FormValues) => {
    const { email, password } = formData;
    signup({ email, password });
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-3 ">
        <div className="max-w-[420px] mx-2 p-8 border border-solid rounded-xl border-gray-200 shadow-lg">
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
                        placeholder="********"
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
                  <Link
                    to="https://www.simplianimate.com/terms-and-condition"
                    target="_blank"
                    className="underline"
                  >
                    Terms & condition
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="https://www.simplianimate.com/privacy-policy"
                    target="_blank"
                    className="underline"
                  >
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
