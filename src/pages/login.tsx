import LoginForm from "@/components/login-form";
import { ModeToggle } from "@/components/mode-toggle";

const Login = () => {
  return (
    <main className="flex h-screen w-full justify-center items-center">
      <div className="relative w-full rounded-md border-2 bg-primary-foreground/10 px-8 pb-8 pt-4 shadow-lg md:w-[420px]">
        <div className="flex flex-col text-center">
          <h1 className="text-[2em]">Login</h1>
          <p className="mb-10 text-gray-400 text">Management System</p>
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
