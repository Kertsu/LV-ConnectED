import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/types/model";
import { ExternalLink, Mail } from "lucide-react";
import { toast } from "sonner";
import CustomHtmlParser from "./CustomHTMLParser";

interface PostSectionProps {
  post: Post | null;
}

export default function PostSection({ post }: PostSectionProps) {
  if (!post) {
    return (
      <Card>
        <CardContent>No post found.</CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <PostFrontGroup post={post} />
        <div className="px-4 py-6 sm:px-6">
          <MetaDataGroup post={post} />
          <div className="mt-6">
            <CustomHtmlParser htmlContent={post.content} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PostFrontGroup({ post }: { post: Post }) {
  return (
    <div className="relative w-full">
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-white hover:bg-black/20"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toast.info("Thumbnail fullscreen view");
        }}
      >
        <ExternalLink className="h-5 w-5" />
      </Button>
      <h1 dangerouslySetInnerHTML={{__html: post.title}} className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white absolute bottom-4 left-4 right-4">
        
      </h1>
    </div>
  );
}

function MetaDataGroup({ post }: { post: Post }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={post.user.avatarUrl} />
          <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-base font-medium">{post.user.name}</p>
          <p className="text-sm text-muted-foreground">{post.user.email}</p>
        </div>
      </div>
      <Button variant="default" className="w-full sm:w-auto">
        <Mail className="h-4 w-4 mr-2" />
        Contact
      </Button>
    </div>
  );
}
