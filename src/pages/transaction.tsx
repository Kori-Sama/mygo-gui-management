import { columns } from "@/components/transaction/columns";
import { DataTable } from "@/components/transaction/data-table";
import { useEffect, useState } from "react";
import { useTransactionStore } from "@/store";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransactionPage = () => {
  const fetchData = useTransactionStore((state) => state.fetchTransactions);
  useEffect(() => {
    fetchData();
  }, []);
  const data = useTransactionStore((state) => state.transactions);

  const [fileKind, setFileKind] = useState<"csv" | "json" | "excel" | "">("");
  const [onDownload, setOnDownload] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(8);

  const onTableChange = (pageIndex: number, pageSize: number) => {
    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };

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
          <DataTable
            columns={columns}
            data={data}
            paginationCallback={onTableChange}
          />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {pageIndex * pageSize + 1}-
              {(pageIndex + 1) * pageSize > data.length
                ? data.length
                : (pageIndex + 1) * pageSize}
            </strong>{" "}
            of <strong>{data.length}</strong> transactions
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
            <p className="text-destructive">Please select a file kind</p>
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
