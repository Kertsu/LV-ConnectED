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

const User: React.FC = () => {
  // State to track visibility of the "Go to Top" button
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Scroll detection to show the arrow button when reaching the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // Check if user has scrolled near the bottom (10% threshold)
      if (scrollTop + clientHeight >= scrollHeight * 0.9) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const posts: Post[] = [];
  const providers: UserModel[] = [];

  return (
    <>
      <Header />
      <div className="flex flex-row w-full container mx-auto px-4">
        <div className="hidden lg:block ">
          <LeftCardSide />
        </div>

        <div className="flex flex-col">
          <div className="container mx-auto px-4">
            <UpperContent />
          </div>
          <div className="container mx-auto px-4">
            <PostForm />
          </div>

          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 justify-center items-center ">
              {posts.map((post: Post) => (
                <PostSummaryCard post={post} />
              ))}
            </div>
          </div>

          <div className="container mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold ">Top Providers</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  gap-4 justify-center items-center pt-10 ">
              {providers.map((provider, index) => (
                <TopProviderCard provider={provider} />
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
        <button onClick={scrollToTop} className="fixed bottom-8 right-8 p-3 ">
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default User;
