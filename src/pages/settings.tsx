import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLangStore } from "@/store";
const SettingsPage = () => {
  const setLang = useLangStore((s) => s.setLang);
  const lang = useLangStore((s) => s.map);
  const defaultLang = useLangStore((s) => s.lang);

  return (
    <>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">{lang.Settings}</h1>
        </div>
        <div className="mx-auto w-full max-w-6xl ">
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>{lang.Language}</CardTitle>
                <CardDescription>
                  {lang.SetYourPreferredLanguage}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  onValueChange={(v) => {
                    setLang(v as "zh" | "en");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={defaultLang}
                      placeholder={defaultLang === "zh" ? "中文" : "English"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default SettingsPage;
