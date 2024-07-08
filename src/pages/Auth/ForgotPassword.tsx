import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

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
import supabase from "@/data/supabaseClient";

type FormValues = {
  email: string;
};

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email
      );
      if (error) throw error;
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-3 ">
        <div className="w-auth-content p-8 border border-solid rounded-xl border-gray-200 shadow-lg">
          <p className="text-lg font-semibold mb-2">Forgot Password?</p>
          <p className="text-sm mb-4">
            We'll send you an email with a link to reset your password.
          </p>
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
              <Button type="submit" className="w-full mt-2">
                Send me a reset link
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
