"use client";

import { useState } from "react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Search } from "lucide-react";
import Header from "@/components/header/user-header/Header";
import TopProviderCard from "@/components/provider-component/top-providers/TopProviderCard";
import { SkeletonCard } from "@/components/ui/skeleton"; 
import { useUserByProvidersPublic } from "@/hooks/useUserData"; // Import your custom hook
import { User } from "@/types/model";

export default function ProvidersFeed() {
  const [providerType, setProviderType] = useState<"all" | "school" | "corporate" | "government">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [page, setPage] = useState(1); 
  const take = 12; // Number of items per page

  // Use custom hook to fetch providers
  const { data, isLoading } = useUserByProvidersPublic(page, take);

  // Check if no more data is available
  const noMoreData = data?.providers.length < take;

  // Filter providers based on selected type and search query
  const filteredProviders = data?.providers.filter((provider: { type: string; name: string; bio: string; }) => 
    (providerType === "all" || provider.type.toLowerCase() === providerType) &&
    (provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.bio.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  return (
    <>
    <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Providers Feed</h1>
        </div>

        {/* Select dropdown, search, and pagination controls in one row */}
        <div className="flex space-x-4 items-center mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          {/* Select provider type filter */}
          <Select value={providerType} onValueChange={(value) => setProviderType(value as "all" | "school" | "corporate" | "government")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="school">Schools</SelectItem>
              <SelectItem value="corporate">Companies</SelectItem>
              <SelectItem value="government">Government</SelectItem>
            </SelectContent>
          </Select>

          {/* Select sort order */}
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "latest" | "oldest")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>

          {/* Pagination controls */}
          <div className="flex space-x-2">
            <Button
              onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
              disabled={page === 1}
              variant={"outline"}
            >
              Previous
            </Button>
            <Button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              disabled={noMoreData}
              variant={"outline"}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Providers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
            : filteredProviders.length > 0
              ? filteredProviders.map((provider: User) => (
                  <TopProviderCard key={provider.id} provider={provider} />
                ))
              : <p>No providers found</p>
          }
        </div>

        {/* Show message when no more data is available */}
        {noMoreData && !isLoading && (
          <div className="text-center mt-4">
            <p>No more providers to load</p>
          </div>
        )}
      </div>
    </>
  );
}
