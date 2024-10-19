"use client";
import PostSummaryCard, {
} from "@/components/post/post-summary/PostSummaryCard";

import Header from "@/components/header/user-header/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search } from "lucide-react";
import { useState } from "react";
import { Post } from "@/types/model";

export default function PostsFeed() {
  const [posts, setPosts] = useState<Post[]>();
  const [activeTab, setActiveTab] = useState<
    "all" | "scholarship" | "internship"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const filteredPosts: Post[] = [
    {
      id: 1,
      thumbnail: "https://picsum.photos/seed/NjVyP1nKs/3137/3871",
      title: "abscido ultio commodo",
      type: "internship",
      content:
        "Conforto absens decipio angulus cilicium peccatus vulgus. Tot ipsa tutis creta. Paulatim ventosus venio cubicularis armarium creber optio iste crudelis centum.\nPatior aer teres supplanto adulatio. Ademptio constans conicio studio alioqui victus defluo combibo. Adimpleo vorago derelinquo calculus corrigo una praesentium cum.\nTurbo callide ventosus amplus canto a. Tam admoveo compono conservo laboriosam compono amita atrox. Hic cunabula censura.",
      createdAt: "2024-02-11T07:24:44.603Z",
      user: {
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
      feedbacks: [
        {
          id: 30,
          rate: 3,
          content:
            "Agnosco molestiae adhuc sequi ulterius quia. Provident suscipio aut comis. Delicate thesis tamisium.",
          createdAt: "2024-01-23T21:15:55.128Z",
          updatedAt: "2024-10-16T06:48:58.605Z",
          user: {
            id: 2,
            avatarUrl: "https://avatars.githubusercontent.com/u/53380626",
            bannerUrl: "https://placehold.co/600x400?text=Student+Banner",
            name: "Gene Schmidt",
            organizationName: null,
            bio: "Solitudo in defluo colligo vomica sophismata cura.",
            email: "Henri96@yahoo.com",
            emailVerifiedAt: "2024-10-16T09:26:15.474Z",
            providerVerifiedAt: null,
            role: "student",
            createdAt: "2024-03-05T13:04:38.457Z",
            updatedAt: "2024-10-16T13:16:26.688Z",
            archivedAt: null,
          },
        },
      ],
    },
  ]
    .filter((post) => activeTab === "all" || post.type === activeTab)
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  const handleCreatePost = () => {
    console.log("Create post clicked");
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Scholarship Feed</h1>
          <Button onClick={handleCreatePost}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Post
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as typeof activeTab)}
        >
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
              {filteredPosts.map((post: Post) => (
                <PostSummaryCard
                  post={post}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="scholarship" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts
                .filter((post : Post) => post.type === "scholarship")
                .map((post : Post) => (
                  <PostSummaryCard
                    post={post}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="internship" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts
                .filter((post) => post.type === "internship")
                .map((post) => (
                  <PostSummaryCard
                    post={post}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}