import { ROLE, type AppRole } from "@/config/roles";

export const ROUTE_BY_ROLE: Record<AppRole, string> = {
  [ROLE.FACULTY]: "/faculty/dashboard",
  [ROLE.PROGRAM_HEAD]: "/program-head/dashboard",
  [ROLE.ADMIN]: "/admin/dashboard",
};

export const AUTH_ROUTES = ["/sign-in", "/forgot-password"];
export const PUBLIC_ROUTES = ["/", "/about", "/contact", ...AUTH_ROUTES];
