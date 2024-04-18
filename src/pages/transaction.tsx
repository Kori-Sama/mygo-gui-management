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

  return (
    <Card x-chunk="dashboard-06-chunk-0" className="lg:mx-64 mt-4">
      <CardHeader>
        <CardTitle>Transaction</CardTitle>
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
  );
};

export default TransactionPage;
