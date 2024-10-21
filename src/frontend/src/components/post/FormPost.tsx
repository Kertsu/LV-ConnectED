import CreatePost from "./post-form/CreatePost";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";

export default function PostForm() {
  const { data } = useAuth();

  const userName = data?.name || "";
  const userAvatarUrl = data?.avatarUrl || "";

  const getUserInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    return initials;
  };
  const userInitials = getUserInitials(userName);

  return (
    <Card className="w-full max-w mx-auto my-8">
      <CardHeader>
        <div className="flex items-center mb-4">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src={userAvatarUrl} alt={userName} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl font-bold text-primary">
              Welcome, {userName}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Provider</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data?.providerVerifiedAt === null ? (
            <>
              <p className="text-muted-foreground">
                <Link to={`/profile`} className="underline text-blue-500">
                  Verify
                </Link> your account. To start create posts and connect with students
                and share your expertise.
              </p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">
                Create and manage your posts to connect with students and share
                your expertise.
              </p>
              <div className="bg-secondary p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-secondary-foreground">
                    Create a New Post
                  </h2>
                  <CreatePost>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      New Post
                    </Button>
                  </CreatePost>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click the button above to create a new post. You can add a
                  title, select a scholarship type, upload a thumbnail, and
                  write your content.
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
