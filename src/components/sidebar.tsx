import { Package2, Home, ArrowLeftRight, Users2, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/dashboard"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                  "bg-accent text-accent-foreground": pathname === "/dashboard",
                }
              )}
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/transaction"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                  "bg-accent text-accent-foreground":
                    pathname === "/transaction",
                }
              )}
            >
              <ArrowLeftRight className="h-5 w-5" />
              <span className="sr-only">Transaction</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Transaction</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/user"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                  "bg-accent text-accent-foreground": pathname === "/user",
                }
              )}
            >
              <Users2 className="h-5 w-5" />
              <span className="sr-only">User</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">User</TooltipContent>
        </Tooltip>
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Link className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              <Users2 className="h-5 w-5" />
              <span className="sr-only">Customers</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Customers</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              <LineChart className="h-5 w-5" />
              <span className="sr-only">Analytics</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Analytics</TooltipContent>
        </Tooltip> */}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <ModeToggle />
          </TooltipTrigger>
          <TooltipContent side="right">Mode Toggle</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/settings"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                  "bg-accent text-accent-foreground": pathname === "/settings",
                }
              )}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default Sidebar;
