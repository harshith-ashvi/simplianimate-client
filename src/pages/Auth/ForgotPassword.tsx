import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MailCheck, X } from "lucide-react";

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
  const { handleResetPasswordForEmail, loading, isMessageSent, errorMessage } =
    useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (formData: FormValues) =>
    handleResetPasswordForEmail(formData.email);

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-3 ">
        <div className="w-auth-content p-8 border border-solid rounded-xl border-gray-200 shadow-lg">
          {isMessageSent ? (
            <>
              <div className="flex items-center justify-start mb-2">
                <MailCheck size={20} />
                <p className="text-lg font-semibold ml-2">Email Sent</p>
              </div>
              <p className="text-sm mb-4">
                Please check your email for reset your password
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold mb-2">Forgot Password?</p>
              <p className="text-sm mb-4">
                We'll send you an email with a link to reset your password.
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
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
                  {errorMessage && (
                    <div className="flex items-center justify-start">
                      <X size={20} color="red" />
                      <p className="text-red-500 text-sm ml-2">
                        {errorMessage}
                      </p>
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={loading}
                  >
                    Send me a reset link
                  </Button>
                </form>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
