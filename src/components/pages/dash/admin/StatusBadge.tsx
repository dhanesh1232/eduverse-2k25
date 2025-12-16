import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    invited: "bg-blue-100 text-blue-700",
    active: "bg-emerald-100 text-emerald-700",
    suspended: "bg-amber-100 text-amber-700",
    deleted: "bg-red-100 text-red-700",
    inactive: "bg-slate-200 text-slate-700",
  };

  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge
      className={cn(statusStyles[status] || "bg-slate-200 text-slate-700")}
    >
      {label}
    </Badge>
  );
}
