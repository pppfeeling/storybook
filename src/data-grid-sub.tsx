import React, {
  CSSProperties,
  ChangeEvent,
  Fragment,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Cell,
  Column,
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
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
  TableHeader,
  TableRow,
} from "./components/ui/tablegrid";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { Eye, Pin } from "lucide-react";
import { Switch } from "./components/ui/switch";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import HeaderColumn, {
  getCommonPinningStyles,
} from "./components/table/HeaderColumn";
import { useSkipper } from "./hook/useSkipper";
import { defaultColumn } from "./components/table/defaultColumn";
import { Task } from "./columns";
import { aggregationFns } from "@tanstack/react-table";

import { useVirtualizer } from "@tanstack/react-virtual";

type DataTableProps<TData> = {
  columns: ColumnDef<unknown, any>[];
  DATA: TData[];
};

export default function DataTable({
  columns,
  DATA,
}: DataTableProps<Task>): JSX.Element {
  const [data, setData] = useState(DATA);

  const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
    columns.map((c) => c.id!)
  );

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data: data,
    columns,
    defaultColumn: defaultColumn,
    initialState: {},
    state: {
      columnOrder,
    },
    autoResetPageIndex,
    onColumnOrderChange: setColumnOrder,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),

    getGroupedRowModel: getGroupedRowModel(),
    aggregationFns: {
      sum: aggregationFns.sum,
    },

    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        //데이터가 바뀔때 현재 page no에 대해 바꾸지 않기 위해 처리
        skipAutoResetPageIndex();
        const updateData = data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...data[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        });

        setData(updateData);
      },
    },
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    table.getColumn("task")?.setFilterValue(e.target.value);
  };

  const ref: any = useRef(null);
  const parentRef: any = useRef(null);

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 73, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => parentRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  /* column reisze시 size를 다시 설정하기 위해 사용*/
  const gridTemplateColumns = (() => {
    const columns = table.getVisibleLeafColumns();

    let columnSize: string[] = [];

    //최소 컬럼사이즈 처리용
    columnSize = columns.map((column) => {
      return column.getSize() < 50 ? "50px" : column.getSize() + "px";
    });

    return { gridTemplateColumns: columnSize.join(" ") };
  })();

  //console.log(table.getTotalSize(), table.getAllColumns().length);
  //console.log(table.getState());

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
      >
        <div
          ref={parentRef}
          style={{
            overflow: "auto", //our scrollable table container
            position: "relative", //needed for sticky header
            height: "800px", //should be a fixed height
          }}
        >
          <Table
            ref={ref}
            className="border-t border-t-slate-500 border-l border-l-slate-500  "
          >
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <SortableContext
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    {headerGroup.headers.map((header) => (
                      <HeaderColumn key={header.id} header={header} />
                    ))}
                  </SortableContext>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index] as Row<unknown>;
                return (
                  <TableRow
                    data-index={virtualRow.index} //needed for dynamic row height measurement
                    ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
                    key={row.id}
                    style={{
                      position: "absolute",
                      transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                    }}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <SortableContext
                        key={cell.id}
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        {/*onClick={handleClick} */}
                        <Item key={cell.id} cell={cell} />
                      </SortableContext>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>

            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableCell key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </Table>
        </div>
      </DndContext>
    </>
  );
}

type ItemProps = {
  cell: Cell<any, unknown>;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => void;
};

function Item({ onClick, onKeyUp, cell }: ItemProps) {
  const sortable = useSortable({ id: cell.column.id });
  const { isDragging, setNodeRef, transform } = sortable;

  let style1: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    width: cell.column.getSize(),
    transform: CSS.Transform.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    zIndex: isDragging ? 1 : 0,
  };

  const style = {
    style1,
    ...getCommonPinningStyles(cell.column),
  };

  let dragingCss = isDragging
    ? "border-dotted border-r border-l  border-r-red-400 border-r-4 border-l-red-400 border-l-4"
    : "border-r border-r-slate-500 border-b border-b-slate-500";

  dragingCss = cell.row.getIsSelected()
    ? dragingCss +
      " before:absolute before:inset-0 before:bg-slate-400 before:contents-[''] before:z-[-1]"
    : dragingCss + " bg-white";

  return (
    <TableCell
      className={`${dragingCss}  focus:outline focus:outline-1 focus:outline-black focus:outline-offset-[-2px] `}
      tabIndex={0}
      ref={setNodeRef}
      style={style}
      onClick={(e) => onClick(e)}
      onKeyUp={(e) => onKeyUp(e)}
    >
      {cell.getIsGrouped() ? (
        <>
          <button
            {...{
              onClick: cell.row.getToggleExpandedHandler(),
              style: {
                cursor: cell.row.getCanExpand() ? "pointer" : "normal",
              },
            }}
          >
            {cell.row.getIsExpanded() ? "👇" : "👉"}{" "}
            {!isDragging &&
              flexRender(cell.column.columnDef.cell, cell.getContext())}{" "}
            ({cell.row.subRows.length})
          </button>
        </>
      ) : cell.getIsAggregated() ? (
        flexRender(
          cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
          cell.getContext()
        )
      ) : cell.getIsPlaceholder() ? null : (
        !isDragging && flexRender(cell.column.columnDef.cell, cell.getContext())
      )}
    </TableCell>
  );
}

function useNavKeyboard(
  itemsRef: React.RefObject<HTMLElement>,
  totalLen: number,
  columnLen: number
) {
  const [cursor, setCursor] = useState(1);

  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.key === "ArrowRight") {
        setCursor((prevCursor) => {
          if (prevCursor === totalLen) {
            return totalLen;
          }

          return prevCursor + 1;
        });
      }

      if (e.key === "ArrowLeft") {
        setCursor((prevCursor) => {
          if (prevCursor === 0) {
            return 0;
          }

          return prevCursor - 1;
        });
      }

      if (e.key === "ArrowDown") {
        setCursor((prevCursor) => {
          if (prevCursor + columnLen > totalLen) {
            return prevCursor;
          }

          return prevCursor + columnLen;
        });
      }

      if (e.key === "ArrowUp") {
        setCursor((prevCursor) => {
          if (prevCursor - columnLen < 0) {
            return prevCursor;
          }

          return prevCursor - columnLen;
        });
      }
    },
    [totalLen, columnLen]
  );

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    setCursor(() => +(e.currentTarget.dataset.cellIndex ?? 0));
  }, []);

  useEffect(() => {
    if (itemsRef.current) {
      const selectCursor = itemsRef.current.querySelector(
        `div[data-cell-index='${cursor}']`
      );
      (selectCursor as HTMLDivElement)?.focus();
    }
  }, [cursor]);

  return {
    handleKey,
    handleClick,
  };
}
