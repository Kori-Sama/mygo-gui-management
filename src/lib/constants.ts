export const links = {
  bilibili: "https://space.bilibili.com/17371684",
  github: "https://github.com/Kori-Sama",
} as const;

export const env = {
  main_url: import.meta.env.VITE_MAIN_SERVER_URL as string,
  admin_url: import.meta.env.VITE_ADMIN_SERVER_URL as string,
} as const;
