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
    // const data = await mockData();
    const res = await fetch("/api/transactions", { method: "GET" });
    const data = (await res.json()).map((val: Transaction) => {
      const s = val.status as string;
      if (s == "DRAFT") {
        val.status = "draft";
      } else if (s == "CENSORING") {
        val.status = "censor";
      } else if (s == "REJECTED") {
        val.status = "reject";
      } else if (s == "PASSED") {
        val.status = "passed";
      }
      val.date = new Date(Number(val.date) * 1000).toLocaleTimeString();
      return val;
    });
    set({
      transactions: data,
    });
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

// async function mockData(): Promise<Transaction[]> {
//   return [
//     {
//       id: 1,
//       title: "Test 1",
//       value: "100",
//       description: "Test 1 description",
//       status: "passed",
//       date: new Date().toLocaleDateString(),
//     },
//     {
//       id: 2,
//       title: "Test 2",
//       value: "200",
//       description: "Test 2 description",
//       status: "reject",
//       date: new Date().toLocaleDateString(),
//     },
//     {
//       id: 3,
//       title: "Test 3",
//       value: "300",
//       description: "Test 3 description",
//       status: "censor",
//       date: new Date().toLocaleDateString(),
//     },
//     {
//       id: 4,
//       title: "Test 4",
//       value: "400",
//       description: "Test 4 description",
//       status: "draft",
//       date: new Date().toLocaleDateString(),
//     },
//     {
//       id: 5,
//       title: "Test 5",
//       value: "500",
//       description: "Test 5 description",
//       status: "passed",
//       date: new Date().toLocaleDateString(),
//     },
//     {
//       id: 6,
//       title: "Test 6",
//       value: "600",
//       description: "Test 6 description",
//       status: "reject",
//       date: new Date().toLocaleDateString(),
//     },
//     {
//       id: 7,
//       title: "Test 7",
//       value: "700",
//       description: "Test 7 description",
//       status: "censor",
//       date: new Date().toLocaleDateString(),
//     },
//     {
//       id: 8,
//       title: "Test 8",
//       value: "800",
//       description: "Test 8 description",
//       status: "draft",
//       date: new Date().toLocaleDateString(),
//     },
//     {
//       id: 9,
//       title: "Test 9",
//       value: "900",
//       description: "Test 9 description",
//       status: "passed",
//       date: new Date().toLocaleDateString(),
//     },
//     {
//       id: 10,
//       title: "Test 10",
//       value: "1000",
//       description: "Test 10 description",
//       status: "reject",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 11,
//       title: "Test 11",
//       value: "1100",
//       description: "Test 11 description",
//       status: "censor",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 12,
//       title: "Test 12",
//       value: "1200",
//       description: "Test 12 description",
//       status: "draft",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 13,
//       title: "Test 13",
//       value: "1300",
//       description: "Test 13 description",
//       status: "passed",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 14,
//       title: "Test 14",
//       value: "1400",
//       description: "Test 14 description",
//       status: "reject",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 15,
//       title: "Test 15",
//       value: "1500",
//       description: "Test 15 description",
//       status: "censor",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 16,
//       title: "Test 16",
//       value: "1600",
//       description: "Test 16 description",
//       status: "draft",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 17,
//       title: "Test 17",
//       value: "1700",
//       description: "Test 17 description",
//       status: "passed",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 18,
//       title: "Test 18",
//       value: "1800",
//       description: "Test 18 description",
//       status: "reject",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 19,
//       title: "Test 19",
//       value: "1900",
//       description: "Test 19 description",
//       status: "censor",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 20,
//       title: "Test 20",
//       value: "2000",
//       description: "Test 20 description",
//       status: "draft",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 21,
//       title: "Test 21",
//       value: "2100",
//       description: "Test 21 description",
//       status: "passed",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 22,
//       title: "Test 22",
//       value: "2200",
//       description: "Test 22 description",
//       status: "reject",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 23,
//       title: "Test 23",
//       value: "2300",
//       description: "Test 23 description",
//       status: "censor",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 24,
//       title: "Test 24",
//       value: "2400",
//       description: "Test 24 description",
//       status: "draft",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 25,
//       title: "Test 25",
//       value: "2500",
//       description: "Test 25 description",
//       status: "passed",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 26,
//       title: "Test 26",
//       value: "2600",
//       description: "Test 26 description",
//       status: "reject",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 27,
//       title: "Test 27",
//       value: "2700",
//       description: "Test 27 description",
//       status: "censor",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 28,
//       title: "Test 28",
//       value: "2800",
//       description: "Test 28 description",
//       status: "draft",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//     {
//       id: 29,
//       title: "Test 29",
//       value: "2900",
//       description: "Test 29 description",
//       status: "passed",
//       date: new Date("2022-1-1").toLocaleDateString(),
//     },
//   ];
// }
