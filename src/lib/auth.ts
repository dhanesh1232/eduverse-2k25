export function requireRole(user: any, roles: RoleBase[]) {
  if (!user || !roles.includes(user.role)) {
    throw new Error("Unauthorized");
  }
}
