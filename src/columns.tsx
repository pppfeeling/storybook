import {
  Cell,
  ColumnDef,
  HeaderContext,
  Row,
  createColumnHelper,
} from "@tanstack/react-table";
import { Checkbox } from "./components/ui/checkbox";
import { ArrowDown, ArrowUp } from "lucide-react";
import EditableCell from "./components/table/EditableCell";
import { useSortable } from "@dnd-kit/sortable";
import { CSSProperties, useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import { extenderColumn } from "./components/table/ExtenderColumn";

type Status = {
  id: number;
  name: string;
};

export type Task = {
  task: string;
  status?: Status;
  due?: Date | null;
  notes: string;
  age: number;
};

const columnHelper = createColumnHelper<Task>();

const StatusCell = ({ props }: { props: any }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: props.cell.column.id,
  });

  const status = props.row.original.status;

  let color;
  switch (status.id) {
    case 1:
      color = "blue";
      break;
    case 2:
      color = "green";
      break;
    case 3:
      color = "orange";
      break;
    default:
      color = "grey";
  }

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    zIndex: isDragging ? 1 : 0,
    width: props.cell.column.getSize(),
    color,
  };

  return (
    <div style={style} ref={setNodeRef}>
      {status.name} ({status.id})
    </div>
  );
};

export const columns = [
  {
    id: "expender",
    ...extenderColumn,
  },
  columnHelper.display({
    id: "rowNum",
    header: "No",
    cell: ({ row }) => <p className="text-center">{row.index + 1}</p>,
    size: 60,
  }),
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        id="header-check"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        id={`cell-checkbox-${row.id}`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        disabled={!row.getCanSelect()}
      />
    ),
    size: 50,
  }),
  columnHelper.accessor("task", {
    id: "task",
    header: ({ column }) => (
      <div
        className="flex cursor-pointer items-center justify-center"
        onClick={() => column.toggleSorting()}
      >
        Task
        {column.getIsSorted() === "desc" && (
          <ArrowUp className="ml-2 h-4 w-4" />
        )}
        {column.getIsSorted() === "asc" && (
          <ArrowDown className="ml-2 h-4 w-4" />
        )}
      </div>
    ),
    enableColumnFilter: true,
    filterFn: "includesString",
    size: 250,
  }),

  columnHelper.accessor((row) => row.status?.name, {
    id: "status",
    header: "status",
    cell: (props) => <StatusCell props={props} />,
    size: 200,
  }),

  columnHelper.accessor("due", {
    id: "due",
    header: "due",
    cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
    size: 200,
  }),
  {
    id: "notes",
    accessorKey: "notes",
    header: "Notes",
    size: 300,
  },
  columnHelper.accessor("age", {
    id: "age",
    header: "age",
    aggregationFn: "sum",
    aggregatedCell: ({ cell, table }) => {
      return (
        <>
          Older by{" "}
          {table.getColumn(cell.row.groupingColumnId ?? "")?.columnDef.header}:{" "}
          {cell.getValue()}
        </>
      );
    },

    footer: (info) => {
      let rows = info.table.getRowModel().rows;
      // 각 열의 합계 계산
      const total = useMemo(
        () =>
          rows.reduce((sum, row) => (row.getValue("age") as number) + sum, 0),
        [rows]
      );

      return <>합계: {total}</>;
    },

    size: 100,
  }),

  ,
];
