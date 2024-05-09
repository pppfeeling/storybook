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

type DataTableProps<TData> = {
  columns: ColumnDef<unknown, any>[];
  DATA: TData[];
  renderSubComponent: (props: { row: Row<TData> }) => React.ReactElement;
  getRowCanExpand: (row: Row<TData | unknown>) => boolean;
};

export default function DataTable({
  columns,
  DATA,
  renderSubComponent,
  getRowCanExpand,
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
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    state: {
      columnOrder,
    },
    autoResetPageIndex,
    getSubRows: (row) => row.subRows,
    onColumnOrderChange: setColumnOrder,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
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
  /* column reisze시 size를 다시 설정하기 위해 사용*/
  const gridTemplateColumns = (() => {
    const columns = table.getVisibleLeafColumns();

    let columnSize: string[] = [];

    //최소 컬럼사이즈 처리용
    columnSize = columns.map((column) => {
      return column.getSize() < 50 ? "50px" : column.getSize() + "px";
    });

    /*
    table.getHeaderGroups().map((headerGroup) => {
      columnSize = headerGroup.headers.map((header) => {

        //minmax를 사용하면 table의 전체 크기는 고정된 상태에서 모든 컬럼의 사이즈가 움직인 비율에 맞춰 조정된다
        //return "minmax(50px," + header.getSize() + "px)";

        //50px가 각 셀의 최소값으로 고정시킴
        return header.getSize() < 50 ? "50px" : header.getSize() + "px";
      });
    });
    */

    console.log(columnSize.join(" "));

    return { gridTemplateColumns: columnSize.join(" ") };
  })();

  const { handleClick, handleKey } = useNavKeyboard(
    ref,
    table.getTotalSize(),
    table.getAllColumns().length
  );

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {})
  );

  //console.log(table.getTotalSize(), table.getAllColumns().length);
  //console.log(table.getState());

  return (
    <>
      <div className="my-2 flex items-center justify-center gap-2 ">
        <Label>Task Column filter</Label>
        <Input
          onChange={handleSearchChange}
          value={(table.getColumn("task")?.getFilterValue() as string) ?? ""}
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

      <div className="my-2 flex items-center justify-center gap-2 ">
        {/* column pin */}
        <Popover>
          <PopoverTrigger>
            <Pin />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-1">
              {table.getAllLeafColumns().map((column) => {
                return (
                  <div key={column.id} className="flex items-center space-x-2">
                    <Switch
                      id={column.id}
                      checked={column.getIsPinned() === "left"}
                      onCheckedChange={() => column.pin("left")}
                    />
                    <Label htmlFor={column.id}>{column.id}</Label>
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>

        {/* visible */}
        <Popover>
          <PopoverTrigger>
            <Eye />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-1">
              <div className="flex items-center space-x-2">
                <Button onClick={table.getToggleAllColumnsVisibilityHandler()}>
                  Toogle All
                </Button>
              </div>
              {table.getAllLeafColumns().map((column) => {
                return (
                  <div key={column.id} className="flex items-center space-x-2">
                    <Switch
                      id={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={() => column.toggleVisibility()}
                    />
                    <Label htmlFor={column.id}>{column.id}</Label>
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <Table
          ref={ref}
          className="border-t border-t-slate-500 border-l border-l-slate-500 h-80 overflow-y-auto"
          style={{ ...gridTemplateColumns }}
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
          <TableBody>
            {table.getRowModel().rows.map((row, ri) => (
              <Fragment key={row.id}>
                <TableRow>
                  {/* first row is a normal row */}
                  {row.getVisibleCells().map((cell, index) => (
                    <SortableContext
                      key={cell.id}
                      items={columnOrder}
                      strategy={horizontalListSortingStrategy}
                    >
                      {/*onClick={handleClick} */}
                      <Item
                        onKeyUp={handleKey}
                        data-cell-index={`${
                          ri * table.getAllColumns().length + index + 1
                        }`}
                        key={cell.id}
                        cell={cell}
                      />
                    </SortableContext>
                  ))}
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
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
    position: "relative",
    transform: CSS.Transform.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    zIndex: isDragging ? 1 : 0,
  };

  const style = {
    style1,
    ...getCommonPinningStyles(cell.column),
  };

  const dragingCss = isDragging
    ? "border-dotted border-r border-l  border-r-red-400 border-r-4 border-l-red-400 border-l-4"
    : "border-r border-r-slate-500 border-b border-b-slate-500";

  return (
    <TableCell
      className={`${dragingCss} bg-white focus:outline focus:outline-1 focus:outline-black focus:outline-offset-[-2px]`}
      tabIndex={0}
      ref={setNodeRef}
      style={style}
      onClick={(e) => onClick(e)}
      onKeyUp={(e) => onKeyUp(e)}
    >
      {!isDragging && flexRender(cell.column.columnDef.cell, cell.getContext())}
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
