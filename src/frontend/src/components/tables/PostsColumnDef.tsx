import { Post } from "@/types/model";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Archive,
  ArchiveRestore,
  ArrowUpDown,
  LoaderCircle,
  MoreHorizontal,
  Square,
  SquareArrowOutUpRight,
  Trash,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import {
  useArchivePost,
  useDeletePost,
  useUnArchivePost,
} from "@/hooks/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const postsColumnDefs = (isLoading: boolean): ColumnDef<Post>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Author",
    cell: ({ row }) => {
      const user = row.original.user;

      return (
        <div className="flex flex-row items-center gap-2 sm:gap-3 max-w-64">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="truncate max-w-[200px] text-sm sm:text-base text-start ">
                <p className="text-sm">{user.name}</p>
                <p className="text-muted-foreground text-xs">{user.email}</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Post Title",
    cell: ({ row }) => (
      <>
        <p
          dangerouslySetInnerHTML={{ __html: row.original.title }}
          className="truncate "
        />
      </>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 hover:bg-none"
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "alphanumeric",
    cell: ({ row }) => {
      const status = row.original.type;
      return <Badge variant={"outline"}>{row.original.type}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    sortingFn: "datetime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Date Posted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt); // Convert to Date object
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div className="truncate">
          {formattedDate} {formattedTime}
        </div>
      );
    },
  },
  {
    accessorKey: "postThumbnailSource",
    header: "Thumbnail",
    cell: ({ row }) => {
      const [isImageLoading, setIsImageLoading] = useState(true); // Loading state for the image

      return (
        <Dialog>
          <DialogTrigger className="text-sm sm:text-base">
            <Badge
              variant={"outline"}
              className="font-medium py-1 px-1.5 text-blue-500 gap-1.5 "
            >
              <SquareArrowOutUpRight className="w-4" />
              View Thumbnail
            </Badge>
          </DialogTrigger>
          <DialogContent className="w-full max-w-lg">
            {isImageLoading && (
              <Skeleton className="h-96 w-full" /> // Show skeleton while image is loading
            )}
            <img
              className={`w-full ${isImageLoading ? "hidden" : "block"}`} // Hide image until loaded
              src={row.original.thumbnail}
              alt="Thumbnail"
              onLoad={() => setIsImageLoading(false)} // Once the image is loaded, hide the skeleton
            />
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "archivedAt",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.archivedAt;
      return (
        <Badge variant={status === null ? "green" : "blue"}>
          {status === null ? "Active" : "Archived"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const { mutate: archivePost } = useArchivePost();
      const { mutate: unarchivePost } = useUnArchivePost();
      const { mutate: deletePost } = useDeletePost();
      const status = row.original.archivedAt;
      const [isPending, setIsPending] = React.useState(false); // Single loading state
      const [open, setOpen] = React.useState(false);

      const handleMutation = (action: () => void) => {
        setIsPending(true);
        action();
      };

      const mutationHandlers = {
        archive: (id: string) =>
          handleMutation(() =>
            archivePost(id, {
              onSuccess: () => {
                toast({
                  title: "Success",
                  description: "Post archived successfully",
                  variant: "default",
                });
                queryClient.invalidateQueries({ queryKey: ["posts"] });
              },
              onSettled: () => setIsPending(false),
            })
          ),
        unarchive: (id: string) =>
          handleMutation(() =>
            unarchivePost(id, {
              onSuccess: () => {
                toast({
                  title: "Success",
                  description: "Post Removed from archived successfully",
                  variant: "default",
                });
                queryClient.invalidateQueries({ queryKey: ["posts"] });
              },
              onSettled: () => setIsPending(false),
            })
          ),
        delete: (id: string) =>
          handleMutation(() =>
            deletePost(id, {
              onSuccess: () => {
                toast({
                  title: "Success",
                  description: "Post deleted successfully",
                  variant: "default",
                });
                setOpen(false);
                queryClient.invalidateQueries({ queryKey: ["posts"] });
              },
              onSettled: () => setIsPending(false),
              onError: (error: Error) => {
                toast({
                  title: "Error!",
                  description: "Failed to delete post!!",
                  variant: "destructive",
                });
                setOpen(false);
              },
            })
          ),
      };

      if (isPending) {
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="ml-1.5">
                <LoaderCircle className="animate-spin h-5 w-5 text-gray-600 " />
              </DropdownMenuTrigger>
            </DropdownMenu>
          </>
        ); // Replace the skeleton with the animated loader
      }
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link
                  to={`/posts/${row.original.id}`}
                  className=" flex gap-2 items-center"
                >
                  <SquareArrowOutUpRight className="w-4" />
                  View Post
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {status === null ? (
                <DropdownMenuItem
                  className="px-2 flex gap-2 items-center"
                  onClick={mutationHandlers.archive.bind(
                    null,
                    row.original.id!.toString()
                  )}
                >
                  <Archive className="w-4 text-blue-500" />{" "}
                  <span className="text-blue-500">Archive</span>
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem
                    className="px-2 flex gap-2 items-center"
                    onClick={mutationHandlers.unarchive.bind(
                      null,
                      row.original.id!.toString()
                    )}
                  >
                    <ArchiveRestore className="w-4" /> Remove Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-2 flex gap-2 items-center"
                    asChild // Make this item a trigger for the dialog
                  >
                    <DialogTrigger>
                      <div className="flex items-center gap-2">
                        <Trash className="w-4 text-red-500" />
                        <span className="text-red-500">Delete Post</span>
                      </div>
                    </DialogTrigger>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dialog for confirming post deletion */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Post</DialogTitle>
              <DialogDescription>
                This action is irreversible. All your data will be permanently
                removed.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                disabled={isPending} // Disable the button while the mutation is pending
                variant="destructive"
                onClick={() =>
                  mutationHandlers.delete(row.original.id!.toString())
                }
              >
                Confirm Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
