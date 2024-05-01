import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { useLangStore } from "@/store";

const Status = ({
  className,
  children,
}: {
  className?: string;
  children: string;
}) => {
  const lang = useLangStore((s) => s.lang);
  return (
    <Badge
      className={cn(
        "font-semibold text-white",
        children === "passed"
          ? "bg-green-500"
          : children === "reject"
          ? "bg-red-500"
          : children === "censor"
          ? "bg-yellow-500"
          : "bg-gray-500",
        className
      )}
    >
      {lang == "en"
        ? children.charAt(0).toUpperCase() + children.slice(1)
        : children === "passed"
        ? "通过"
        : children === "reject"
        ? "退回"
        : children === "censor"
        ? "审核"
        : "草案"}
    </Badge>
  );
};

export default Status;
