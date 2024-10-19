import { useArchiveUser, useDeleteAccount } from "@/hooks/useUserData";
import { User } from "@/types/model";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const providersColumns: ColumnDef<User>[] = [
  // CHECKBOX
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
  // END CHECKBOX
  //ACCOUNT
  {
    accessorKey: "id",
    header: "Account",
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-2 sm:gap-3 truncate">
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
          <AvatarImage src={row.original.avatarUrl} />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
        <p className="text-sm sm:text-base">{row.original.name}</p>
      </div>
    ),
  },
  // END ACCOUNT
  // EMAIL
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 hover:bg-none"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "alphanumeric",
    cell: ({ row }) => (
      <p className="text-sm min-w-[100px] sm:min-w-none ">
        {row.original.email}
      </p>
    ),
  },
  //END EMAIL
  // VALID ID
  {
    accessorKey: "validIdUrl",
    header: "Valid Id",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger className="text-sm sm:text-base underline text-blue-600 min-w[100px] truncate">
          View ID
        </DialogTrigger>
        <DialogContent className="w-full max-w-lg">
          <img className="w-full" src={row.original.validIdUrl} alt="id" />
        </DialogContent>
      </Dialog>
    ),
  },
  // END VALID ID
  // DATE JOINED
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
          Date Joined
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="text-sm min-w-[100px]  truncate sm:min-w-none ">
        {row.original.createdAt}
      </p>
    ),
  },
  // END DATE JOINED
  // STATUS
  {
    accessorKey: "providerVerfiedAt",
    sortingFn: "datetime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.providerVerifiedAt;

      return (
        <Badge variant={status ? "default" : "destructive"}>
          {status ? "Verified" : "Pending"}
        </Badge>
      );
    },
  },
  // END STATUS
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { mutate: archiveUser } = useArchiveUser();
      const { mutate: deleteUser } = useDeleteAccount();

      const status = row.original.providerVerifiedAt;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {status ? (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    archiveUser(row.original.id!.toString());
                  }}
                >
                  Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    deleteUser(row.original.id!.toString());
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    archiveUser(row.original.id!.toString());
                  }}
                >
                  Approve
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    deleteUser(row.original.id!.toString());
                  }}
                >
                  Reject
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
