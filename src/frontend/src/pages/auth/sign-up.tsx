import { registerUser } from "@/api/authService";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import * as z from "zod";

// Define the sign-up schema without password
const signUpSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    role: z.enum(["provider", "student"]),
  })
  .refine((data) => !!data.email, {
    message: "Email is required",
    path: ["email"],
  });

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "student",
    },
  });

  const onSignUp = async (values: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    console.log("Sign up", values); // Debugging output

    // Simulate successful sign-up (replace this with your actual logic)
    try {
      // TODO: Implement your actual sign-up logic here
      // Temporarily navigate to OTP verification page
      const result = await registerUser(values);

      console.log("Sign up response: ", result.user);
      console.log(result.message);

      if (result.success) {
        navigate("/otp-verification", {
          state: {
            token: result.token,
            email: result.user.email,
            origin: "register",
          },
        });
      }
    } catch (error) {
      console.error("Sign-up error:", error); // Log any error
    }

    setIsLoading(false);
  };

  return (
    <Form {...signUpForm}>
      <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
        <FormField
          control={signUpForm.control}
          name="name"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
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

        <FormField
          control={signUpForm.control}
          name="role"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="provider">Provider</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
