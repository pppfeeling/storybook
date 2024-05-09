import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid min-w-full  text-sm", className)}
    {...props}
  />
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "col-span-full grid grid-cols-subgrid sticky top-0 z-[1] ",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex w-full  ", className)} {...props} />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "h-12 px-4 text-left font-medium text-muted-foreground flex items-center",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("grid relative ", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex p-4  align-middle ", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell };
