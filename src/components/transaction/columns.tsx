import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Transaction } from "@/lib/types";
import Status from "../status";
import { Textarea } from "../ui/textarea";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex">
              <p>Status</p>
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.setFilterValue("")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.setFilterValue("passed")}>
              Passed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.setFilterValue("censor")}>
              Censor
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.setFilterValue("reject")}>
              Reject
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.setFilterValue("draft")}>
              Draft
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <Status>{status}</Status>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      if (description.length > 50) {
        return description.slice(0, 50) + "...";
      }
      return description;
    },
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="flex">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <span className="sr-only">Action</span>,
    cell: ({ row }) => {
      const { title, description, status, date } = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <div className="flex flex-col justify-between m-2 gap-2">
                  <div>{title}</div>
                  <p className="text-sm text-accent">{date}</p>
                </div>
              </DialogTitle>
              <DialogDescription>
                <Textarea readOnly value={description} />
              </DialogDescription>
              <DialogFooter>
                <div className="flex items-center w-full justify-between mt-2">
                  <Status>{status}</Status>
                  <div className="flex gap-4 items-center">
                    <Button variant="destructive">Reject</Button>
                    <Button variant="secondary">Pass</Button>
                  </div>
                </div>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
