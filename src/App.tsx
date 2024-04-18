import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
