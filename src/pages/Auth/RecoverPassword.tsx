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
  password: string;
  confirmPassword: string;
};

const FormSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z.string(),
});

const RecoverPassword = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });
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
          <p className="text-lg font-semibold mb-2">Reset Password</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Password<span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Confirm Password
                      <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-2">
                Reset Password
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
