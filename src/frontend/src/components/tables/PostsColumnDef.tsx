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
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";

export const postsColumnDefs: ColumnDef<Post>[] = [
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
    header: "Provider",
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-2 sm:gap-3">
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
          <AvatarImage src={row.original.user.avatarUrl} />
          <AvatarFallback>
            {row.original.user.name ? row.original.user.name.charAt(0) : "A"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm truncate max-w-[150px] md:max-w-none">
            {row.original.user.name}
          </p>
          <p className="text-xs truncate max-w-[150px] sm:max-w-none text-muted-foreground">
            {row.original.user.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "postTitle",
    header: "Post Title",
    cell: ({ row }) => (
      <p
        dangerouslySetInnerHTML={{ __html: row.original.title }}
        className="truncate "
      ></p>
    ),
  },
  {
    accessorKey: "postType",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.type;
      return (
        <Badge variant={status === "internship" ? "default" : "destructive"}>
          {status === "internship" ? "Active" : "Archived"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "postType",
    header: "Post Type",
  },
  {
    accessorKey: "postDate",
    header: "Date Posted",
    cell: ({ row }) => <div className="truncate">{row.original.createdAt}</div>,
  },
  {
    accessorKey: "postThumbnailSource",
    header: "Thumbnail",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger className="text-sm sm:text-base underline text-blue-600">
          View Thumbnail
        </DialogTrigger>
        <DialogContent className="w-full max-w-lg">
          <img
            className="w-full"
            src={row.original.thumbnail}
            alt="id"
          />
        </DialogContent>
      </Dialog>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Suspend</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Archive</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
