import LoginForm from "@/components/login-form";
import { ModeToggle } from "@/components/mode-toggle";
import { useLangStore } from "@/store";

const Login = () => {
  const lang = useLangStore((s) => s.map);
  return (
    <main className="flex h-screen w-full justify-center items-center">
      <div className="relative w-full rounded-md border-2 bg-primary-foreground/10 px-8 pb-8 pt-4 shadow-lg md:w-[420px]">
        <div className="flex flex-col text-center">
          <h1 className="text-[2em]">{lang.Login}</h1>
          <p className="mb-10 text-gray-400 text">{lang.ManagementSystem}</p>
          <LoginForm />
          <div className="flex justify-end">
            <ModeToggle />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
