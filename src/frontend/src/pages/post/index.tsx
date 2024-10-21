import {
  createBookmark,
  deleteBookmark,
  isBookmarked,
} from "@/api/bookmarkService";
import { getPostById } from "@/api/postService";
import Header from "@/components/header/user-header/Header";
import PostSection from "@/components/post/post-components/PostSection";
import ReviewSection from "@/components/post/post-components/ReviewSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { Post } from "@/types/model";
import { Bookmark, BookmarkCheck, MoveLeft, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data } = useAuth();

  const role = data?.role;
  const [bookmarked, setBookmarked] = useState<boolean>();

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setError("Post ID is required.");
        setLoading(false);
        return;
      }

      try {
        const data = await getPostById(postId);
        setPost(data.post);
      } catch (error) {
        setError("Error fetching post information.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  // useEffect(() => {
  //   isBookmarked(String(postId))
  //     .then((result) => {
  //       setBookmarked(result?.bookmarked);
  //     })
  //     .catch((error) => {
  //       toast.error(error.message);
  //     });
  // }, []);

  const handleBack = () => {
    navigate(-1);
    toast.info("Back to feed");
  };

  const handleShare = () => {
    // Implement share functionality
    toast.success("Post shared successfully!");
  };

  const handleBookmark = async () => {
    // Implement bookmark functionality
    try {
      if (!bookmarked) {
        await createBookmark(String(postId));
        setBookmarked(true);
        toast.success("Saved to Bookmark");
      } else {
        await deleteBookmark(String(postId));
        setBookmarked(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLike = () => {
    // Implement like functionality
    toast.success("Post liked!");
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleBack}
          >
            <MoveLeft className="h-4 w-4" />
            {role === "admin" ? "Back" : "Back to feed"}
          </Button>
          <div className="flex gap-2">
            {role === "admin" ? (
              <Badge variant={post?.archivedAt === null ? "green" : "blue"}>
                {post?.archivedAt === null ? "Active" : "Archived"}
              </Badge>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={handleBookmark}>
                  {!bookmarked ? (
                    <>
                      <Bookmark className="h-4 m-4 mr-2" /> Save
                    </>
                  ) : (
                    <>
                      <BookmarkCheck className="h-4 w-4 mr-2" /> Saved
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {post ? <PostSection post={post} /> : <div>No post available.</div>}
          </div>
          <div>
            <Card>
              <CardContent className="p-6">
                {post ? (
                  <ReviewSection feedbacks={post.feedbacks} />
                ) : (
                  <div>No reviews available.</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-[300px] w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    </div>
  );
}
