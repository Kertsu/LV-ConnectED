import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserCircle, Settings, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function LeftCardSide() {
  const navigate = useNavigate();
  const { data, isAuthenticated } = useAuth(); // Destructure authentication state from useAuth
  const [isLoading, setIsLoading] = useState(true); // Manage loading state locally

  // Effect to manage loading state when user data changes
  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  // Show skeleton loading UI while data is being fetched
  if (isLoading) {
    return <LeftCardSideSkeleton />;
  }

  // Error or unauthenticated state
  if (!isAuthenticated || !data) {
    return <div></div>;
  }

  return (
    <div className="w-0 md:w-64 lg:w-64 bg-background p-6 flex flex-col space-y-6 border-r h-screen overflow-y-auto sticky top-16">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={data.avatarUrl || "/default-avatar.png"}
            alt={data.name || "User Avatar"}
          />
          <AvatarFallback>
            {data.name ? data.name.charAt(0) : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            {data.name || "Unknown User"}
          </h2>
          <p className="text-sm text-muted-foreground">{data.role || "N/A"}</p>
        </div>
      </div>
      <p className="text-sm text-center text-muted-foreground">
        {data.bio || "No bio available"}
      </p>
      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          size="sm"
          onClick={() => navigate("/profile")}
        >
          <UserCircle className="mr-2 h-4 w-4" />
          Profile
        </Button>
        {data.role !== "admin" && (
          <Button
            variant="outline"
            className="w-full justify-start"
            size="sm"
            onClick={() => navigate("/profile")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Button>
        )}
        {data.role === "admin" && (
          <Button
            variant="outline"
            className="w-full justify-start"
            size="sm"
            onClick={() => navigate("/admin")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Admin Dashboard
          </Button>
        )}
      </div>
      <div className="mt-auto text-xs text-muted-foreground space-y-1">
        <p>
          Member since{" "}
          {data.createdAt
            ? format(new Date(data.createdAt), "MMMM dd, yyyy")
            : "N/A"}
        </p>
        <p>ConnectEd 2024</p>
      </div>
    </div>
  );
}

function LeftCardSideSkeleton() {
  return (
    <div className="w-0 md:w-64 lg:w-64 bg-background p-6 flex flex-col space-y-6 border-r h-screen overflow-y-auto sticky top-16">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="w-20 h-20 rounded-full" />
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-4 w-24 mx-auto" />
        </div>
      </div>
      <Skeleton className="h-16 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className="mt-auto space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
