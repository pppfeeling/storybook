import React, { useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getGroupedRowModel,
  useReactTable,
  aggregationFns,
} from "@tanstack/react-table";

interface Task {
  category: string;
  name: string;
  age: number;
  score: number;
  price: number;
}

const data: Task[] = [
  { category: "A", name: "John", age: 25, score: 80, price: 100 },
  { category: "A", name: "Jane", age: 32, score: 90, price: 150 },
  { category: "B", name: "Bob", age: 28, score: 75, price: 200 },
  { category: "B", name: "Alice", age: 40, score: 85, price: 120 },
];

const columnHelper = createColumnHelper<Task>();

export function ClaudeTable() {
  const columns = useMemo(
    () => [
      columnHelper.group((row) => row.category, {
        header: "Category",
        footer: (props) => <b>Category Total</b>,
      }),
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("age", {
        header: "Age",
        aggregationFn: "sum",
        footer: (info) => info.aggregation && `Sum: ${info.aggregation}`,
      }),
      columnHelper.accessor("score", {
        header: "Score",
        aggregationFn: "sum",
        footer: (info) => info.aggregation && `Sum: ${info.aggregation}`,
      }),
      columnHelper.accessor("price", {
        header: "Price",
        aggregationFn: "sum",
        footer: (info) => info.aggregation && `Sum: $${info.aggregation}`,
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    aggregationFns: {
      sum: aggregationFns.sum,
    },
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {cell.getIsGrouped() ? (
                    <>
                      <b>{cell.renderCell()}</b>
                      {cell.getIsGrouped() && cell.row.subRows.length > 0 && (
                        <span style={{ marginLeft: "8px" }}>
                          ({cell.row.subRows.length})
                        </span>
                      )}
                    </>
                  ) : (
                    cell.renderCell()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderFooter()}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
