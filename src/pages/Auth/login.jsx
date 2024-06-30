"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const formSchema = z.object({
  sesa: z.string().min(2, {
    message: "Sesa must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Pass must be at least 6 characters.",
  }),
});

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sesa: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary font-poppins relative">
      <div className="w-full max-w-md p-6 bg-white rounded-lg drop-shadow-xl">
        <Card className="rounded-md">
          <CardContent>
            <h2 className="text-2xl font-bold text-center mt-3 mb-6">Login Expertise</h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="sesa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start gap-3 items-center">
                          SESA
                          <FormMessage className="text-xs" />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="sesa"
                            {...field}
                            className="rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start gap-3 items-center">
                          Password
                          <FormMessage className="text-xs" />
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="password"
                              {...field}
                              className="rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute inset-y-0 right-0 flex items-center px-3"
                            >
                              {showPassword ? <EyeOffIcon className="h-5 w-5 text-black" /> : <EyeIcon className="h-5 w-5 text-black" />}
                            </button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary"
                >
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
