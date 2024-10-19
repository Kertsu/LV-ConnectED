import React from "react";
import { useNavigate } from "react-router-dom";
import { RainbowButton } from "@/components/ui/rainbow-button";

interface SignInDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const SignInDialog: React.FC<SignInDialogProps> = ({
}) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/auth");      
  };

  return (
    <>
      <RainbowButton onClick={handleSignIn}>Get Started</RainbowButton>
    </>
  );
};

export default SignInDialog;
