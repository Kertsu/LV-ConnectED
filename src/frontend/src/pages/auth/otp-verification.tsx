import { verifyLoginOtp, verifyRegistrationOtp } from "@/api/authService";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ToastAction } from "@/components/ui/toast";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function OtpVerification() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [otpOrigin, setOTPOrigin] = useState<"register" | "login">();
  setOTPOrigin(location.state.origin);
  setEmail(location.state.email as string);
  setToken(location.state.token as string);
  const { login } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const { toast } = useToast();

  const navigate = useNavigate();

  const handleResendOTP = () => {
    toast({
      title: "Wait",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
  };

  const handleVerifyOtp = async ({ otp }: z.infer<typeof FormSchema>) => {
    try {
      if (otpOrigin == "register") {
        const response = await verifyRegistrationOtp({ token, otp, email });
        login(response.data.token);
      } else {
        const response = await verifyLoginOtp({ token, otp, email });
        login(response.data.token);
      }

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleVerifyOtp)}>
          <div className="w-full max-w-md rounded-lg shadow-lg p-6 border">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Enter OTP
            </h2>
            <p className="text-center mb-6">
              Please enter the 6-digit code sent to your email.
            </p>
            <div className="flex justify-center items-center space-x-2">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6}>
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="border rounded-md"
                          />
                          <InputOTPSlot
                            index={1}
                            className="border rounded-md"
                          />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={2}
                            className="border rounded-md"
                          />
                          <InputOTPSlot
                            index={3}
                            className="border rounded-md"
                          />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={4}
                            className="border rounded-md"
                          />
                          <InputOTPSlot
                            index={5}
                            className="border rounded-md"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center mb-4 pt-10">
              <button
                className="text-sm border rounded-md p-2 w-full transition duration-150"
                type="submit"
              >
                Verify OTP
              </button>
            </div>
            <div className="text-center">
              <p className="text-gray-500 mb-2 text-sm">
                Didn't receive the code?
              </p>
              <button
                className="hover:underline focus:outline-none text-sm"
                onClick={handleResendOTP}
              >
                Resend OTP
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
