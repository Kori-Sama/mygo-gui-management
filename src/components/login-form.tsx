import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessageOccupation,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { User, Lock, RectangleEllipsis } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { env } from "@/lib/constants";
import { useLangStore } from "@/store";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(6, {
    message: "At least 6 characters long",
  }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, password } = values;
    const res = await fetch(env.main_url + "/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.code === 200) {
      const token = res.headers.get("Authorization");
      localStorage.setItem("token", token!);
      navigate("/");
      return;
    }
    form.setError("username", {
      type: "manual",
      message: data.msg,
    });
  };

  const lang = useLangStore((s) => s.map);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FieldWrapper icon="username">
                <FormControl>
                  <Input placeholder={lang.Username} {...field} />
                </FormControl>
              </FieldWrapper>
              <FormMessageOccupation />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FieldWrapper icon="password">
                <FormControl>
                  <Input
                    type="password"
                    placeholder={lang.Password}
                    {...field}
                  />
                </FormControl>
              </FieldWrapper>
              <FormMessageOccupation />
            </FormItem>
          )}
        />

        <Button type="submit">{lang.Submit}</Button>
      </form>
    </Form>
  );
};
export default LoginForm;

interface FieldWrapperProps {
  className?: string;
  children: React.ReactNode;
  icon: "username" | "password" | "confirm";
}

export const FieldWrapper = ({
  className,
  children,
  icon,
}: FieldWrapperProps) => {
  let iconComponent: ReactNode;
  switch (icon) {
    case "username":
      iconComponent = <User />;
      break;
    case "password":
      iconComponent = <Lock />;
      break;
    case "confirm":
      iconComponent = <RectangleEllipsis />;
      break;
  }
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {iconComponent}
      {children}
      <div className="w-[24px]" />
    </div>
  );
};
