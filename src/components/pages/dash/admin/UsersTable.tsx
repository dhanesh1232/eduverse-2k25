"use client";

import { Pencil, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Column<T> = {
  key: keyof T;
  label: string;
  className?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type UsersTableProps<T extends { id: string; status: string }> = {
  title: string;
  columns: Column<T>[];
  data: T[];
  addLabel: string;
  loading?: boolean;
  onAdd?: () => void;
  onEdit?: (row: T) => void;
};

export function UsersTable<T extends { id: string; status: string }>({
  title,
  columns,
  data,
  addLabel,
  loading,
  onAdd,
  onEdit,
}: UsersTableProps<T>) {
  const hasData = data.length > 0;

  return (
    <Card className="border border-border rounded p-0 gap-0">
      <CardHeader className="flex flex-row items-center justify-between gap-2 p-2">
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage and track {title.toLowerCase()} in your institution.
          </p>
        </div>
        <Button size="sm" onClick={onAdd} variant="outline">
          <Plus className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">{addLabel}</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                {columns.map((c) => (
                  <TableHead
                    key={String(c.key)}
                    className={c.className ?? "whitespace-nowrap text-xs"}
                  >
                    {c.label}
                  </TableHead>
                ))}
                <TableHead className="whitespace-nowrap text-xs">
                  Status
                </TableHead>
                <TableHead className="text-right text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((c) => (
                      <TableCell key={String(c.key)}>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                    ))}
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="ml-auto h-8 w-8 rounded-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : hasData ? (
                data.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/40">
                    {columns.map((c) => {
                      const value = row[c.key];
                      return (
                        <TableCell
                          key={String(c.key)}
                          className={c.className ?? "align-middle text-sm"}
                        >
                          {c.render ? c.render(value, row) : String(value)}
                        </TableCell>
                      );
                    })}
                    <TableCell className="align-middle">
                      <StatusBadge status={row.status} />
                    </TableCell>
                    <TableCell className="align-middle text-right">
                      <RowActions row={row} onEdit={onEdit} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 2}
                    className="h-24 text-center text-sm text-muted-foreground"
                  >
                    No records yet. Click{" "}
                    <span className="font-semibold">{addLabel}</span> to create
                    the first one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function RowActions<T>({ row, onEdit }: { row: T; onEdit?: (row: T) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full"
          aria-label="Row actions"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit?.(row)}>
          <Pencil className="mr-2 h-3.5 w-3.5" />
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
