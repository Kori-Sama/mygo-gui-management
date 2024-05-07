import { columns } from "@/components/transaction/columns";
import { DataTable } from "@/components/transaction/data-table";
import { useEffect, useState } from "react";
import { useLangStore, useTransactionStore } from "@/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
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

  const [fileKind, setFileKind] = useState<"csv" | "json" | "excel">("excel");

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(8);

  const onTableChange = (pageIndex: number, pageSize: number) => {
    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };

  const lang = useLangStore((s) => s.map);

  const [downloadLink, setDownloadLink] = useState("");

  useEffect(() => {
    if (fileKind === "excel" || fileKind === "csv") {
      const cols = columns as { accessorKey: string }[];

      let csvStr =
        cols
          .filter((col) => col.accessorKey !== "action")
          .map((col) => col.accessorKey)
          .join(",") + "\r\n";
      csvStr += data.map((row) => Object.values(row).join(",")).join("\r\n");

      if (fileKind == "excel") {
        setDownloadLink(
          "data:application/vnd.ms-excel;charset=utf-8,\uFEFF" +
            encodeURIComponent(csvStr)
        );
      } else {
        setDownloadLink(
          "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csvStr)
        );
      }
    } else if (fileKind === "json") {
      setDownloadLink(
        "data:application/json;charset=utf-8,\uFEFF" +
          encodeURIComponent(JSON.stringify(data))
      );
    }
  }, [fileKind]);

  return (
    <Dialog>
      <Card x-chunk="dashboard-06-chunk-0" className="lg:mx-64 mt-4">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <p>{lang.Transaction}</p>
              <DialogTrigger asChild>
                <Button>{lang.Export}</Button>
              </DialogTrigger>
            </div>
          </CardTitle>
          <CardDescription>
            {lang.ManageYourTransactionAndViewTheirDetails}
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
          <DialogTitle>{lang.ExportToLocalFile}</DialogTitle>
        </DialogHeader>
        <div>
          <Select
            onValueChange={(kind) => {
              setFileKind(kind as "csv" | "json" | "excel");
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  fileKind.charAt(0).toUpperCase() + fileKind.slice(1)
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <a href={downloadLink} className={buttonVariants()} download>
            {lang.Download}
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionPage;
