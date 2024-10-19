"use client";

import { loginUser } from "@/api/authService";
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
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import * as z from "zod";

// Define the validation schema without password
const signInSchema = z.object({
  email: z.string().email(),
});

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function for redirection
  const { login } = useAuth();

  // Initialize the form with react-hook-form and Zod for validation
  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema), // Use Zod resolver for validation
    defaultValues: {
      email: "",
    },
  });

  // Handle sign-in form submission
  const onSignIn = async (values: z.infer<typeof signInSchema>) => {
    try {
      setIsLoading(true); // Set loading state to true during the sign-in process

      // Simulate sign-in process for development purposes
      // TODO: Replace with actual sign-in logic in production
      console.log("Sign in", values);
      const response = await loginUser(values);

      // For now, navigate the user to the home page after sign-in
      navigate("/otp-verification", {
        state: {
          otp: response.data.token,
          email: response.data.user.email,
          origin: "login",
        },
      });

      setIsLoading(false); // Set loading state to false after sign-in
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
        {/* Email Field */}
        <FormField
          control={signInForm.control}
          name="email"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
