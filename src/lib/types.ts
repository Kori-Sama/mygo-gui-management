export type Transaction = {
  id: number;
  title: string;
  value: string;
  description: string;
  status: "passed" | "reject" | "censor" | "draft";
  date: string;
};
