import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Book,
  Users,
  Calendar,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/header/user-header/Header";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/model";

export default function ProviderProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const provider = [
    {
      id: 2,
      avatarUrl: "https://avatars.githubusercontent.com/u/53380626",
      bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
      name: "Gene Schmidt",
      organizationName: null,
      bio: "Solitudo in defluo colligo vomica sophismata cura.",
      email: "Henri96@yahoo.com",
      emailVerifiedAt: "2024-10-16T09:26:15.474Z",
      providerVerifiedAt: null,
      role: "provider",
      createdAt: "2024-03-05T13:04:38.457Z",
      updatedAt: "2024-10-16T13:16:26.688Z",
      archivedAt: null,
      type: "other",
    },
  ].find((provider: User) => provider.id === id);

  if (!provider) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Provider not found
        </h1>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 p-0 hover:bg-transparent dark:hover:bg-transparent"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="text-sm">Back</span>
        </Button>
        {/* <Card className="overflow-hidden">
          <CardHeader className="pb-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                <AvatarImage src={provider.avatarUrl} alt={provider.name} />
                <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <Badge className="mb-2">{provider.type}</Badge>
                <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
                  {provider.name}
                </CardTitle>
                <div className="flex items-center justify-center sm:justify-start text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">[Location]</span>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < provider.rating
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {provider.rating.toFixed(1)} ({provider.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-6">
            <p className="text-muted-foreground">{provider.description}</p>
            <Separator className="my-6" />
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Scholarship Details
                </h2>
                <p className="text-sm text-muted-foreground">
                  {provider.scholarship}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Additional Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Book className="h-4 w-4 mr-2" />
                    <span>10+ Courses Offered</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>500+ Students Enrolled</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Established in 2010</span>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-wrap gap-2">
              {[
                "Online",
                "In-Person",
                "Flexible Schedule",
                "Certification",
              ].map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between">
            <Button className="w-full sm:w-auto">Contact Provider</Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Website
            </Button>
          </CardFooter>
        </Card> */}
      </div>
    </div>
  );
}