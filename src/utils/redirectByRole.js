export const redirectByRole = (role) => {
  if (role === "admin") return "/dashboard";
  if (role === "tutor") return "/dashboard";
  return "/dashboard"; // student default
};
