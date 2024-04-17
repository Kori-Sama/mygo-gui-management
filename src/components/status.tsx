import { cn } from "@/lib/utils";

const Status = ({
  className,
  children,
}: {
  className?: string;
  children: string;
}) => {
  return (
    <span
      className={cn(
        "px-2 py-1 rounded-lg text-md font-semibold text-white",
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
    </span>
  );
};

export default Status;
