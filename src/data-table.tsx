import React, { ChangeEvent, useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { useTableNav } from "@table-nav/react";
import { debounce } from "lodash";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  search?: (query: string) => void;
};

export default function DataTable<TData, TValue>({
  columns,
  data,
  search,
}: DataTableProps<TData, TValue>) {
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const { tableNav, listeners } = useTableNav();

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    table.getColumn("status")?.setFilterValue(e.target.value);
  };

  console.log("state", table.getState());
  console.log("allColumn", table.getAllColumns());

  return (
    <>
      <div className="my-2 flex items-center justify-center gap-2 ">
        <Label>Task Column filter</Label>
        <Input
          onChange={handleSearchChange}
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
        ></Input>
      </div>
      <div className="my-2 flex items-center justify-center gap-2 ">
        <Label>Global Column filter</Label>
        <Input></Input>
      </div>
      <div className="my-2 flex items-center justify-center gap-2 ">
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          {"<"}
        </Button>
        <div className="text-base font-bold">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          {">"}
        </Button>
        <Select
          onValueChange={(value) => table.setPageSize(Number(value))}
          value={table.getState().pagination.pageSize.toString()}
        >
          <SelectTrigger className="w-20">
            <SelectValue placeholder="표시 갯수" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10개</SelectItem>
            <SelectItem value="20">20개</SelectItem>
            <SelectItem value="50">50개</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table
        className=" border-collapse border border-slate-500 "
        pclassName="h-[200px]"
        {...listeners}
      >
        <TableHeader className="sticky z-10 mb-[40px]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="sticky top-0">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="border border-slate-600 bg-slate-500 "
                  style={{
                    // header의 column의 size를 가져와서 width를 조정해준다.
                    width: `${header.getSize()}px`,
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className=" ">
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  tabIndex={-1}
                  className=" border border-slate-700 "
                  style={{
                    // cell의 column의 size를 가져와서 width를 조정해준다.
                    width: `${cell.column.getSize()}px`,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
