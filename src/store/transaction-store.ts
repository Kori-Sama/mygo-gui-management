import { Transaction } from "@/lib/types";
import { create } from "zustand";

interface TransactionState {
  transactions: Transaction[];
  fetchTransactions: () => Promise<Transaction[]>;
  getTransactionById: (id: number) => Transaction | undefined;
  getAllTransactions: () => Transaction[];
}
const useTransactionStore = create<TransactionState>()((set) => ({
  transactions: [],
  fetchTransactions: async () => {
    const data = await mockData();
    set({ transactions: data });
    return data;
  },
  getTransactionById: (id: number): Transaction | undefined => {
    return useTransactionStore
      .getState()
      .transactions.find((transaction: Transaction) => transaction.id === id);
  },
  getAllTransactions: (): Transaction[] => {
    return useTransactionStore.getState().transactions;
  },
}));

export default useTransactionStore;

async function mockData(): Promise<Transaction[]> {
  return [
    {
      id: 1,
      title: "Test 1",
      value: "100",
      description: "Test 1 description",
      status: "passed",
      date: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: "Test 2",
      value: "200",
      description: "Test 2 description",
      status: "reject",
      date: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      title: "Test 3",
      value: "300",
      description: "Test 3 description",
      status: "censor",
      date: new Date().toLocaleDateString(),
    },
    {
      id: 4,
      title: "Test 4",
      value: "400",
      description: "Test 4 description",
      status: "draft",
      date: new Date().toLocaleDateString(),
    },
    {
      id: 5,
      title: "Test 5",
      value: "500",
      description: "Test 5 description",
      status: "passed",
      date: new Date().toLocaleDateString(),
    },
    {
      id: 6,
      title: "Test 6",
      value: "600",
      description: "Test 6 description",
      status: "reject",
      date: new Date().toLocaleDateString(),
    },
    {
      id: 7,
      title: "Test 7",
      value: "700",
      description: "Test 7 description",
      status: "censor",
      date: new Date().toLocaleDateString(),
    },
    {
      id: 8,
      title: "Test 8",
      value: "800",
      description: "Test 8 description",
      status: "draft",
      date: new Date().toLocaleDateString(),
    },
    {
      id: 9,
      title: "Test 9",
      value: "900",
      description: "Test 9 description",
      status: "passed",
      date: new Date().toLocaleDateString(),
    },
    {
      id: 10,
      title: "Test 10",
      value: "1000",
      description: "Test 10 description",
      status: "reject",
      date: new Date("2022-1-1").toLocaleDateString(),
    },
  ];
}
