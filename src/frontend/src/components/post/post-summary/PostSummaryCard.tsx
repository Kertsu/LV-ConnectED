import {
  createBookmark,
  deleteBookmark,
  isBookmarked,
} from "@/api/bookmarkService";
import { createFeedback } from "@/api/feedbackService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { Post } from "@/types/model";
import {
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  Facebook,
  Forward,
  Link as LinkIcon,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PostSummaryCard: React.FC<{ post: Post }> = ({ post }) => {
  const navigate = useNavigate();

  const { id, user, type, createdAt, thumbnail, title, content, feedbacks, bookmarks } =
    post;

  // comment count is just the number of feedbacks that have a content
  const commentCount = feedbacks.filter((feedback) => feedback.content).length;

  const [ratingsUsers, setRatingsUsers] = useState<string[]>([
    "User1",
    "User2",
    "User3",
    "User4",
    "User5",
    "User6",
    "User7",
    "User8",
  ]);
  const [bookmarksUsers, setBookmarksUsers] = useState<string[]>([
    "UserA",
    "UserB",
    "UserC",
    "UserD",
    "UserE",
    "UserF",
    "UserG",
    "UserH",
  ]);
  const [commentsUsers, setCommentsUsers] = useState<string[]>([
    "Commenter1",
    "Commenter2",
    "Commenter3",
    "Commenter4",
    "Commenter5",
    "Commenter6",
    "Commenter7",
    "Commenter8",
  ]);

  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    if (
      navigator.maxTouchPoints > 0 ||
      (navigator.maxTouchPoints !== undefined && navigator.maxTouchPoints > 0)
    ) {
      setIsTouchDevice(true);
    }

    isBookmarked(String(id))
      .then((result) => {
        setBookmarked(result?.bookmarked!);
      })
      .catch((error) => {
        toast({
          description: error.message,
        });
      });
  }, []);

  const handleRating = async () => {
    // Here you would typically send the rating to your backend
    console.log(
      `Submitted rating ${ratingValue} for post ${id} with comment: ${ratingComment}`
    );

    try {
      const result = await createFeedback(
        ratingValue as number,
        ratingComment,
        String(id)
      );

      if (result.success) {
        toast({
          description: "Feedback Submitted!",
        });
      }
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "destructive",
      });
    }
    toast({
      title: "Rating Submitted",
      description: "Thank you for your feedback!",
    });
  };

  const handleBookmark = async () => {
    // Here you would typically toggle the bookmark status in your backend
    try {
      if (!bookmarked) {
        await createBookmark(String(id));
        setBookmarked(true);
        toast({
          description: "Saved to Bookmark",
        });
      } else {
        await deleteBookmark(String(id));
        setBookmarked(false);
      }
    } catch (error: any) {
      toast({
        description: error.message,
      });
    }
  };

  const handleShare = (type: "copy" | "facebook") => {
    if (type === "copy") {
      navigator.clipboard.writeText(`https://yourwebsite.com/posts/${id}`);

      toast({
        title: "Link Copied",
        description: "Post link has been copied to clipboard.",
      });
    } else if (type === "facebook") {
      // Here you would typically open a Facebook share dialog
      console.log(`Sharing post ${id} on Facebook`);
    }
  };

  return (
    <Card className="">
      <CardHeader className="py-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Avatar
              className="w-10 h-10 cursor-pointer"
              onClick={() => alert("redirect to indiv provider screen")}
            >
              <AvatarImage
                className="aspect-square object-cover rounded-full"
                src={user.avatarUrl}
                alt={user.name}
              />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-.5">
              <HoverCard>
                <HoverCardTrigger>
                  <h3
                    role="button"
                    className="text-md font-medium z-[1] max-w-[10rem] truncate hover:underline underline-offset-2 cursor-pointer md:max-w-[12rem] xl:max-w-[14rem] 2xl:max-w-[18rem]"
                    onClick={() => alert("Redirect to indiv provider screen")}
                  >
                    {user.name}
                  </h3>
                </HoverCardTrigger>
                <HoverCardContent className="w-[25rem]">
                  <div className="flex justify-between space-x-4">
                    <Avatar
                      className="w-16 h-16 cursor-pointer"
                      onClick={() => alert("redirect to indiv provider screen")}
                    >
                      <AvatarImage
                        className="aspect-square object-cover rounded-full"
                        src={user.avatarUrl}
                        alt={user.name}
                      />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3
                        role="button"
                        className="text-lg font-medium z-[1] w-full hover:underline underline-offset-2 cursor-pointer lg:text-wrap"
                        onClick={() =>
                          alert("Redirect to indiv provider screen")
                        }
                      >
                        {user.name}
                      </h3>
                      <p className="text-sm">
                        Insert provider description here if there is any.
                      </p>
                      <div className="flex items-center pt-2">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                          Joined [insert date here]
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <p className="text-xs text-gray-500 max-w-[10rem] truncate md:max-w-[12rem] xl:max-w-[14rem] 2xl:max-w-[18rem]">
                {user.email}
              </p>
              <p className="hidden">
                {/** TODO: postType & postDate for filtering currently hidden */}
                {type}
                {createdAt}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center">
            {/* <Badge className="cursor-pointer">Trending</Badge> */}
            <Link
              to={`/posts/${id}`}
              className="text-blue-500 text-sm hover:underline underline-offset-2 cursor-pointer"
            >
              View post
            </Link>
          </div>
        </div>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="pb-4">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <h3
                className="text-lg font-bold max-w-[18rem] truncate xl:max-w-[26rem]"
                dangerouslySetInnerHTML={{ __html: title }}
              ></h3>
            </div>
            <img
              src={thumbnail}
              alt={`${title} thumbnail`}
              className="w-full rounded-md object-cover max-h-[15rem] min-h-[15rem] cursor-pointer"
              onClick={() => navigate(`/posts/${id}`)}
            />
          </div>

          <div className="w-full flex flex-col gap-1 z-[2]">
            <p
              dangerouslySetInnerHTML={{ __html: content }}
              className="text-sm text-gray-500 line-clamp-3"
            ></p>
          </div>
        </div>
      </CardContent>

      <div className="w-full h-12 flex justify-between items-center px-4 border-b">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex cursor-pointer items-center hover:underline underline-offset-2">
                <small>{feedbacks.length} ratings</small>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <ul>
                {ratingsUsers.slice(0, 7).map((user, index) => (
                  <li key={index}>{user}</li>
                ))}
                {ratingsUsers.length > 7 && (
                  <li>{ratingsUsers.length - 7} more</li>
                )}
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex gap-2 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex cursor-pointer items-center hover:underline underline-offset-2">
                  <small>{bookmarks.length} bookmarks</small>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <ul>
                  {bookmarksUsers.slice(0, 7).map((user, index) => (
                    <li key={index}>{user}</li>
                  ))}
                  {bookmarksUsers.length > 7 && (
                    <li>{bookmarksUsers.length - 7} more</li>
                  )}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex cursor-pointer items-center hover:underline underline-offset-2">
                  <small>{commentCount} comments</small>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <ul>
                  {commentsUsers.slice(0, 7).map((user, index) => (
                    <li key={index}>{user}</li>
                  ))}
                  {commentsUsers.length > 7 && (
                    <li>{commentsUsers.length - 7} more</li>
                  )}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="w-full flex gap-1 items-center p-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full px-2" variant="ghost">
              <Star className="mr-0.5 h-4" /> Rate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rate this Post</DialogTitle>
              <DialogDescription>
                Share your experience with this post.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center space-x-1 my-5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  onClick={() => setRatingValue(star)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      ratingValue >= star
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </Button>
              ))}
            </div>
            <Textarea
              placeholder="Leave a comment (optional)"
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
            />
            <DialogFooter>
              <Button onClick={handleRating}>Submit Rating</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          className="w-full px-2"
          variant="ghost"
          onClick={handleBookmark}
        >
          {!bookmarked ? (
            <>
              <Bookmark className="mr-0.5 h-4" /> Bookmark
            </>
          ) : (
            <>
              <BookmarkCheck className="mr-0.5 h-4" /> Bookmarked
            </>
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full px-2" variant="ghost">
              <Forward className="mr-0.5 h-4" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => handleShare("copy")}>
              <LinkIcon className="mr-2 h-4 w-4" />
              <span>Copy link</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleShare("facebook")}>
              <Facebook className="mr-2 h-4 w-4" />
              <span>Share on Facebook</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default PostSummaryCard;
