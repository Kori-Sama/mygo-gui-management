export const getToken = () => {
  return localStorage.getItem("token") ?? "No Token";
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};