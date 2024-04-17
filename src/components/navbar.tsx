import { Link, useLocation } from "react-router-dom";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav className="flex items-center gap-4 text-sm lg:gap-6 fixed">
      <LinkItem path="dashboard" />
      <LinkItem path="transaction" />
    </nav>
  );
};

export default Navbar;

const LinkItem = ({ path }: { path: string }) => {
  const pathname = useLocation().pathname;
  return (
    <Link
      to={path}
      className={cn(
        navigationMenuTriggerStyle(),
        pathname === `/${path}` ? "bg-accent text-accent-foreground" : ""
      )}
    >
      {path.charAt(0).toUpperCase() + path.slice(1)}
    </Link>
  );
};
