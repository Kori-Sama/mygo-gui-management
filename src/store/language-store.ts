import { create } from "zustand";

const dict = [
  {
    Dashboard: "Dashboard",
    Transaction: "Transaction",
    User: "User",
    Settings: "Settings",
    History: "History",
    Login: "Login",
    ManagementSystem: "Management System",
    Language: "Language",
    SetYourPreferredLanguage: "Set your preferred language",
    ManageYourTransactionAndViewTheirDetails:
      "Manage your Transaction and view their details",
    Draft: "Draft",
    Passed: "Passed",
    Reject: "Reject",
    Censor: "Censor",
    Logout: "Logout",
    Status: "Status",
    Filter: "Filter",
    All: "All",
    Title: "Title",
    Description: "Description",
    Value: "Value",
    Date: "Date",
    NoResult: "No Result",
    Next: "Next",
    Previous: "Previous",
    Export: "Export",
    TransactionDetails: "Transaction Details",
    FromLastMonth: "from last month",
    ExportToLocalFile: "Export to local file",
    Download: "Download",
    PleaseSelectAFileKind: "Please select a file kind",
    FileKind: "File kind",
    Submit: "Submit",
    Username: "Username",
    Password: "Password",
    Overview: "Overview",
  },
  {
    Dashboard: "仪表盘",
    Transaction: "交易",
    User: "用户",
    Settings: "设置",
    History: "历史",
    Login: "登录",
    ManagementSystem: "平台管理系统",
    Language: "语言",
    SetYourPreferredLanguage: "设置您的首选语言",
    ManageYourTransactionAndViewTheirDetails: "管理您的交易并查看其详细信息",
    Draft: "草案",
    Passed: "通过",
    Reject: "退回",
    Censor: "审核",
    Logout: "登出",
    Status: "状态",
    Filter: "过滤",
    All: "全部",
    Title: "标题",
    Description: "描述",
    Value: "价值",
    Date: "日期",
    NoResult: "没有结果",
    Next: "下一个",
    Previous: "上一个",
    Export: "导出",
    TransactionDetails: "交易详情",
    FromLastMonth: "比上个月",
    ExportToLocalFile: "导出到本地文件",
    Download: "下载",
    PleaseSelectAFileKind: "请选择文件类型",
    FileKind: "文件类型",
    Submit: "提交",
    Username: "用户名",
    Password: "密码",
    Overview: "概览",
  },
];

type Lang = "en" | "zh";

interface LangState {
  lang: Lang;
  map: (typeof dict)[0];
  setLang: (lang: "en" | "zh") => void;
  load: () => void;
}

const useLangStore = create<LangState>((set) => ({
  lang: "en",
  map: dict[1],
  setLang: (lang: Lang) => {
    set({ lang });
    if (lang === "en") {
      set({ map: dict[0] });
    } else if (lang === "zh") {
      set({ map: dict[1] });
    }
    localStorage.setItem("lang", lang);
  },
  load: () => {
    const lang = localStorage.getItem("lang") as Lang;
    if (lang) {
      set({ lang });
      if (lang === "en") {
        set({ map: dict[0] });
      } else if (lang === "zh") {
        set({ map: dict[1] });
      }
    }
  },
}));

export default useLangStore;
