import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

const Status = ({
  className,
  children,
}: {
  className?: string;
  children: string;
}) => {
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
      {children.charAt(0).toUpperCase() + children.slice(1)}
    </Badge>
  );
};

export default Status;
