import { columns } from "@/components/transaction/columns";
import { DataTable } from "@/components/transaction/data-table";
import { useEffect, useState } from "react";
import { useTransactionStore } from "@/store";
import { Transaction } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransactionPage = () => {
  // const [status, setStatus] = useState("all");
  const [data, setData] = useState<Transaction[]>([]);
  const fetchData = useTransactionStore((state) => state.fetchTransactions);
  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [fileKind, setFileKind] = useState<"csv" | "json" | "excel" | "">("");
  const [onDownload, setOnDownload] = useState(false);

  return (
    <Dialog>
      <Card x-chunk="dashboard-06-chunk-0" className="lg:mx-64 mt-4">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <p>Transaction</p>
              <DialogTrigger asChild>
                <Button>Export</Button>
              </DialogTrigger>
            </div>
          </CardTitle>
          <CardDescription>
            Manage your Transaction and view their details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export to local file</DialogTitle>
        </DialogHeader>
        <div>
          <Select
            onValueChange={(kind) => {
              setFileKind(kind as "csv" | "json" | "excel" | "");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="File kind" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
            </SelectContent>
          </Select>
          {fileKind === "" && onDownload ? (
            <p className="text-red-500">Please select a file kind</p>
          ) : null}
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setOnDownload(true);
              console.log(fileKind);
            }}
          >
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionPage;
