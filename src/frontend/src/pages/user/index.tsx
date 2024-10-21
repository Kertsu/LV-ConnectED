import React, { useEffect, useState } from "react";
import Header from "@/components/header/user-header/Header";
import UpperContent from "@/components/user/UpperContent";
import PostSummaryCard from "@/components/post/post-summary/PostSummaryCard";
import TopProviderCard from "@/components/provider-component/top-providers/TopProviderCard";
import RightCardSide from "@/components/user/RightCardSide";
import { ArrowUp } from "lucide-react";
import LeftCardSide from "@/components/user/LeftCardSide";
import PostForm from "@/components/post/FormPost";
import { Post, User as UserModel } from "@/types/model";
import { useAuth } from "@/hooks/use-auth";
import { useAllPost } from "@/hooks/usePostData";
import { useUserByProviders } from "@/hooks/useUserData"; 
import { SkeletonCard } from "@/components/ui/skeleton";

const User: React.FC = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const { data: user } = useAuth();

  const skip = 0; 
  const take = 10; 

  // Fetching posts using the custom hook with skip and take arguments
  const { data: postsData, isLoading: postsLoading } = useAllPost(skip, take);
  const posts: Post[] = postsData?.posts || [];

  // Fetching providers using your new hook
  const { data: providersData, isLoading: providersLoading } = useUserByProviders(skip, take); // Pass skip and take for pagination
  const filteredProviders: UserModel[] = providersData?.providers || []; // Adjust based on your API response

  // Scroll detection to show the arrow button when reaching the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight * 0.9) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
    <Header />
    <div className="flex flex-row w-full container mx-auto px-4">
      <div className="hidden lg:block">
        <LeftCardSide />
      </div>
  
      <div className="flex flex-col flex-grow"> {/* Added flex-grow to ensure it takes available space */}
        <div className="container mx-auto px-4">
          {user?.role !== "provider" && <UpperContent />}
        </div>
  
        <div className="container mx-auto px-4">
          {/* Use a min-height to avoid layout shifts */}
          <div className="min-h-[40px]"> {/* Adjust min-height as needed */}
            {user?.role !== "student" && <PostForm />}
          </div>
        </div>
  
        <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold">Posts</h1>

          <div className="grid grid-cols-1 gap-4 justify-center items-center py-4">
            {postsLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              posts.length > 0 ? (
                posts.map((post: Post) => (
                  <PostSummaryCard key={post.id} post={post} />
                ))
              ) : (
                <div>No posts available.</div>
              )
            )}
          </div>
        </div>
  
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold">Providers</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-center items-center pt-10">
            {providersLoading
              ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
              : filteredProviders.map((provider: UserModel) => (
                  <TopProviderCard key={provider.id} provider={provider} />
                ))}
          </div>
        </div>
      </div>
  
      <div className="hidden lg:block">
        <RightCardSide />
      </div>
    </div>
  
    {/* Up arrow button */}
    {showScrollToTop && (
      <button onClick={scrollToTop} className="fixed bottom-8 right-8 p-3">
        <ArrowUp className="h-6 w-6" />
      </button>
    )}
  </>
  
  );
};

export default User;
