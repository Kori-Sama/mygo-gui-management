import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { useLangStore, useTransactionStore } from "@/store";
import { useState } from "react";

/* eslint-disable */
export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      const lang = useLangStore((s) => s.map);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex">
              <p>{lang.Status}</p>
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{lang.Filter}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.setFilterValue("")}>
              {lang.All}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.setFilterValue("passed")}>
              {lang.Passed}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.setFilterValue("censor")}>
              {lang.Censor}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.setFilterValue("reject")}>
              {lang.Reject}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.setFilterValue("draft")}>
              {lang.Draft}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <Status>{status}</Status>;
    },
    size: 20,
  },
  {
    accessorKey: "title",
    header: () => {
      const lang = useLangStore((s) => s.map);
      return <p>{lang.Title}</p>;
    },
  },
  {
    accessorKey: "description",
    header: () => {
      const lang = useLangStore((s) => s.map);
      return <p>{lang.Description}</p>;
    },
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
    header: () => {
      const lang = useLangStore((s) => s.map);
      return <p>{lang.Value}</p>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      const lang = useLangStore((s) => s.map);
      return (
        <div className="flex">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {lang.Date}
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
      const [tx, setTx] = useState(row.original);
      const handleTx = useTransactionStore((s) => s.handleTransaction);
      const setStoreTx = useTransactionStore((s) => s.setTransaction);
      const lang = useLangStore((s) => s.map);
      /* eslint-enable */

      const handle = (action: "reject" | "pass") => {
        handleTx(tx.id, action).then((t) => {
          setTx(t);
          setStoreTx(t);
        });
      };

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
                  <div>{tx.title}</div>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                </div>
              </DialogTitle>
              <DialogDescription>
                <Textarea
                  readOnly
                  value={tx.description}
                  className="h-[200px]"
                />
              </DialogDescription>
              <DialogFooter>
                <div className="flex items-center w-full justify-between mt-2">
                  <Status>{tx.status}</Status>
                  <DialogClose>
                    <div className="flex gap-4 items-center">
                      <Button
                        variant="destructive"
                        onClick={() => handle("reject")}
                      >
                        {lang.Reject}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handle("pass")}
                      >
                        {lang.Passed}
                      </Button>
                    </div>
                  </DialogClose>
                </div>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
    size: 20,
  },
];
