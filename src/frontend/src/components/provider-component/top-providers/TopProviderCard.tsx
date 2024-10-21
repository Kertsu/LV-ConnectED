import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/types/model";

const DEFAULT_BANNER_URL = "/placeholder.svg?height=192&width=384";
const DEFAULT_AVATAR_URL = "/placeholder.svg?height=96&width=96";

interface TopProviderCardProps {
  provider: User;
}

const TopProviderCard: React.FC<TopProviderCardProps> = ({ provider }) => {
  const navigate = useNavigate();
  const { id, name, bannerUrl, avatarUrl, bio } = provider;

  const handleViewProfile = () => {
    navigate(`/provider-profile/${id}`);
  };

  return (
    <Card className="w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
        <img
          src={bannerUrl || DEFAULT_BANNER_URL}
          alt={`${name}'s banner`}
          className="w-full h-full object-cover opacity-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <CardContent className="relative pt-16 pb-6 px-6">
        <Avatar className="absolute -top-12 left-6 h-24 w-24 border-4 border-background shadow-lg">
          <AvatarImage
            src={avatarUrl || DEFAULT_AVATAR_URL}
            alt={`${name}'s avatar`}
            className="object-cover"
          />
          <AvatarFallback className="text-2xl font-bold">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-4 min-h-[120px]">
          <h3 className="font-semibold text-lg line-clamp-1 text-black dark:text-white">{name}</h3>
          {bio && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {bio}
            </p>
          )}
        </div>
        <Button 
          className="w-full mt-4" 
          onClick={handleViewProfile}
          variant="outline"
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default TopProviderCard;