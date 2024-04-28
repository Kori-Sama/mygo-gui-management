import { env } from "@/lib/constants";
import { Transaction } from "@/lib/types";
import { create } from "zustand";

interface TransactionState {
  transactions: Transaction[];
  fetchTransactions: () => Promise<Transaction[]>;
  getTransactionById: (id: number) => Transaction | undefined;
  getAllTransactions: () => Transaction[];
  handleTransaction: (
    id: number,
    action: "get" | "pass" | "reject" | "delete"
  ) => Promise<Transaction>;
  setTransaction: (tx: Transaction) => void;
}
const useTransactionStore = create<TransactionState>()((set) => ({
  transactions: [],
  fetchTransactions: async () => {
    const res = await fetch(env.admin_url + "/transactions", {
      method: "GET",
    });
    const data = (await res.json()).map(convertTx);
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
  handleTransaction: async (
    id: number,
    action: string
  ): Promise<Transaction> => {
    const query = `${env.admin_url}/transaction?id=${id}&action=${action}`;
    const res = await fetch(query, {
      method: "POST",
    });
    const tx = convertTx(await res.json());
    set((state) => {
      const index = state.transactions.findIndex((t) => t.id === tx.id);
      state.transactions[index] = tx;
      return { transactions: state.transactions };
    });
    return tx;
  },
  setTransaction: (tx: Transaction) => {
    set((state) => {
      const newTx = state.transactions.map((t) => {
        if (t.id === tx.id) {
          return tx;
        } else {
          return t;
        }
      });
      return { transactions: newTx };
    });
  },
}));

const convertTx = (val: Transaction) => {
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
};

export default useTransactionStore;
