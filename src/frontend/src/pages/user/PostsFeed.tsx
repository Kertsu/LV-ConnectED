import { useState } from "react";
import PostSummaryCard from "@/components/post/post-summary/PostSummaryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Search } from "lucide-react";
import Header from "@/components/header/user-header/Header";
import { SkeletonCard } from "@/components/ui/skeleton";
import { useAllPost } from "@/hooks/usePostData"; // This hook needs to be created
import { Post, User as UserModel } from "@/types/model";
import { useAuth } from "@/hooks/use-auth"; // Assuming your auth hook provides user details

export default function PostsFeed() {
  const [activeTab, setActiveTab] = useState<"all" | "scholarship" | "internship">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [page, setPage] = useState(0);
  const take = 20;

  const { data: user } = useAuth();

  const { data, isLoading,  } = useAllPost(page * take, take);

  const filteredPosts = data?.posts
  .filter((post: { type: string }) =>
    activeTab === "all" || post.type === activeTab // If the active tab is "all", show all posts. Otherwise, filter by post type.
  )
  .filter((post: { title: string; content: string }) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) =>
    sortOrder === "latest"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );


  return (
    <>
      <Header />
      <div className="container mx-auto ">
        <div className="flex justify-between items-center mb-6 pt-10">
          <h1 className="text-2xl font-bold">Posts Feed</h1>
          {user?.role !== "student" && ( // Use && to conditionally render the button
            <Button onClick={() => console.log("Create post clicked")}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Post
            </Button>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "scholarship" | "internship")}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="scholarship">Scholarships</TabsTrigger>
            <TabsTrigger value="internship">Internships</TabsTrigger>
          </TabsList>

          <div className="flex space-x-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value as "latest" | "oldest")}
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
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              ) : (
                filteredPosts.length > 0 ? (
                  filteredPosts.map((post: Post) => (
                    <PostSummaryCard key={post.id} post={post} />
                  ))
                ) : (
                  <div>No posts available.</div>
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
