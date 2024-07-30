import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  sesa: z.string().min(2, {
    message: "Sesa must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
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

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (values) => {
    try {
      const res = await axios.post("https://api-siexpert.vercel.app/api/login", values);
      localStorage.setItem("token", res.data.data.token);
      toast({
        title: "Success",
        description: "You've login successfully!",
        className: "text-left",
        variant: "success",
      });
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An unexpected error occurred";

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary font-poppins p-4">
      <div className="w-full max-w-md bg-white rounded-lg drop-shadow-xl">
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
                        <FormLabel className="flex justify-between items-center">
                          SESA
                          <FormMessage className="text-xs" />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="SESA.."
                            {...field}
                            className="rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            onChange={(e) => {
                              const uppercaseValue = e.target.value.toUpperCase();
                              field.onChange(uppercaseValue);
                            }}
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
                        <FormLabel className="flex justify-between items-center">
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
