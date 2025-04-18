const ADMIN_PASSWORD = "portfolio2024"; // In a real app, this would not be hardcoded

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("admin_authenticated") === "true";
};

export const login = (password: string): boolean => {
  const isValid = password === ADMIN_PASSWORD;

  if (isValid) {
    localStorage.setItem("admin_authenticated", "true");
  }

  return isValid;
};

export const logout = (): void => {
  localStorage.removeItem("admin_authenticated");
};
