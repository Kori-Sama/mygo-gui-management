import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/lib/types";
import { ReactElement, useMemo } from "react";
import { Separator } from "../ui/separator";
import { ArrowRightLeft, CircleCheck, CircleX, ScanSearch } from "lucide-react";
import { useLangStore } from "@/store";

const useDiff = (data: Transaction[], filter: (v: Transaction) => boolean) => {
  const d = data.filter(filter);

  const increment = useMemo(() => {
    const lastMonth = d.filter(
      (v) => new Date(v.date).getMonth() === new Date().getMonth() - 1
    );
    const currentMonth = d.filter(
      (v) => new Date(v.date).getMonth() === new Date().getMonth()
    );

    if (lastMonth.length === 0) {
      return "+∞%";
    }

    const delta = currentMonth.length - lastMonth.length;
    const diff = ((delta / lastMonth.length) * 100).toFixed(2);

    return `${delta > 0 ? "+" : ""}${diff}%`;
  }, [d]);

  return increment;
};

const ICONS = new Map<string, ReactElement>();
ICONS.set("total", <ArrowRightLeft />);
ICONS.set("censor", <ScanSearch />);
ICONS.set("passed", <CircleCheck />);
ICONS.set("reject", <CircleX />);

const Overview = ({ tx }: { tx: Transaction[] }) => {
  const totalDiff = useDiff(tx, () => true);
  const censorDiff = useDiff(tx, (v) => v.status === "censor");
  const passedDiff = useDiff(tx, (v) => v.status === "passed");
  const rejectDiff = useDiff(tx, (v) => v.status === "reject");

  const lang = useLangStore((s) => s.map);

  return (
    <div>
      <Separator className="mt-4" />
      <h1 className="text-lg p-2">{lang.TransactionDetails}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title={lang.All}
          value={tx.length.toString()}
          increment={totalDiff}
          icon="total"
        />
        <OverviewCard
          title={lang.Censor}
          value={tx.filter((v) => v.status === "censor").length.toString()}
          increment={censorDiff}
          icon="censor"
        />
        <OverviewCard
          title={lang.Passed}
          value={tx.filter((v) => v.status === "passed").length.toString()}
          increment={passedDiff}
          icon="passed"
        />
        <OverviewCard
          title={lang.Reject}
          value={tx.filter((v) => v.status === "reject").length.toString()}
          increment={rejectDiff}
          icon="reject"
        />
      </div>
      <Separator className="my-8" />
    </div>
  );
};

export default Overview;

type OverviewCardProps = {
  title: string;
  value: string;
  increment: string;
  icon: string;
};

const OverviewCard = ({ title, value, increment, icon }: OverviewCardProps) => {
  const lang = useLangStore((s) => s.map);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {ICONS.get(icon)}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {increment + " " + lang.FromLastMonth}
        </p>
      </CardContent>
    </Card>
  );
};
