import { columns } from "@/components/transaction/columns";
import { DataTable } from "@/components/transaction/data-table";
import { useEffect, useState } from "react";
import { useTransactionStore } from "@/store";
import { Transaction } from "@/lib/types";

const TransactionPage = () => {
  // console.log("1243333333");
  const [data, setData] = useState<Transaction[]>([]);
  const fetchData = useTransactionStore((state) => state.fetchTransactions);
  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TransactionPage;
