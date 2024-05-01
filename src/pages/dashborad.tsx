import HistoryTable from "@/components/dashboard/history-table";
import Overview from "@/components/dashboard/overview";
import PieTable from "@/components/dashboard/pie-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLangStore, useTransactionStore } from "@/store";
import { useEffect } from "react";

const Dashboard = () => {
  const fetchTx = useTransactionStore((s) => s.fetchTransactions);
  useEffect(() => {
    fetchTx();
  }, []);

  const tx = useTransactionStore((s) => s.transactions);
  const lang = useLangStore((s) => s.map);

  return (
    <main className="py-4 px-24">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">{lang.Overview}</TabsTrigger>
          <TabsTrigger value="history">{lang.History}</TabsTrigger>
        </TabsList>
        <Overview tx={tx} />
        <TabsContent value="overview">
          <PieTable tx={tx} />
        </TabsContent>
        <TabsContent value="history">
          <HistoryTable tx={tx} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Dashboard;
