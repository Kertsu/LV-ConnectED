// src/frontend/src/components/provider-component/top-providers/TopProviderCard.tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { User } from "@/types/model";

const TopProviderCard: React.FC<any> = (provider: User) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const { id, name, bannerUrl, avatarUrl, bio } = provider; // Extract user data from props

  const handleViewProfile = () => {
    navigate(`/provider-profile/${id}`); // Navigate to the provider profile page
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48">
          <img
            src={bannerUrl}
            alt="Scholarship background"
            className="w-full h-full object-cover"
          />
          <Avatar className="absolute -translate-y-[50%] left-6 h-[5rem] w-[5rem] border-4 border-background lg:h-[7rem] lg:w-[7rem]">
            <AvatarImage src={avatarUrl} alt="Organization logo" />
            <AvatarFallback>ORGs</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="pt-10 lg:pt-14 pb-6 px-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{bio}</p>
          </div>
          {/* <h4 className="text-xl font-bold">{scholarship}</h4> */}
        </div>
        <Button className="mt-5" onClick={handleViewProfile}>
          {" "}
          {/* Add onClick handler */}
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default TopProviderCard;
