"use client";

import { useState, useEffect } from "react"; // Import useEffect
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Search } from "lucide-react";
import Header from "@/components/header/user-header/Header";
import TopProviderCard from "@/components/provider-component/top-providers/TopProviderCard";
import { SkeletonCard } from "@/components/ui/skeleton"; // Import your SkeletonCard
import { User } from "@/types/model";

export default function ProvidersFeed() {
  const [activeTab, setActiveTab] = useState<
    "all" | "school" | "corporate" | "government"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [loading, setLoading] = useState(true); // Loading state

  const filteredProviders: User[] = [
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
      type: "school",
    },
    {
      id: 3,
      avatarUrl: "https://avatars.githubusercontent.com/u/53380626",
      bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
      name: "Gene Schmidt 3",
      organizationName: null,
      bio: "Solitudo in defluo colligo vomica sophismata cura.",
      email: "Henri96@yahoo.com",
      emailVerifiedAt: "2024-10-16T09:26:15.474Z",
      providerVerifiedAt: null,
      role: "provider",
      createdAt: "2024-03-05T13:04:38.457Z",
      updatedAt: "2024-10-16T13:16:26.688Z",
      archivedAt: null,
      type: "school",
    },
  ]
    .filter(
      (provider) =>
        activeTab === "all" || provider.type.toLowerCase() === activeTab
    )
    .filter(
      (provider) =>
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.bio.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Providers Feed</h1>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as typeof activeTab)}
        >
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="school">Schools</TabsTrigger>
            <TabsTrigger value="corporate">Companies</TabsTrigger>
            <TabsTrigger value="government">Government</TabsTrigger>
          </TabsList>

          <div className="flex space-x-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={sortOrder}
              onValueChange={(value) =>
                setSortOrder(value as "latest" | "oldest")
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map(
                    (
                      _,
                      index // Display 6 skeletons
                    ) => <SkeletonCard key={index} />
                  )
                : filteredProviders.map((provider: User) => (
                    <TopProviderCard provider={provider} />
                  ))}
            </div>
          </TabsContent>

          <TabsContent value="school" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                : filteredProviders
                    .filter(
                      (provider) => provider.type?.toLowerCase() === "school"
                    )
                    .map((provider) => <TopProviderCard provider={provider} />)}
            </div>
          </TabsContent>

          <TabsContent value="corporate" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                : filteredProviders
                    .filter(
                      (provider) => provider.type?.toLowerCase() === "corporate"
                    )
                    .map((provider) => <TopProviderCard provider={provider} />)}
            </div>
          </TabsContent>

          <TabsContent value="government" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                : filteredProviders
                    .filter(
                      (provider) =>
                        provider.type?.toLowerCase() === "government"
                    )
                    .map((provider) => <TopProviderCard provider={provider} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}