import { Column, Header, flexRender } from "@tanstack/react-table";
import { CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import { Equal } from "lucide-react";
import { TableHead } from "../ui/tablegrid";

type HeaderColumnProp<Task, TData> = {
  header: Header<Task, TData>;
};

export default function HeaderColumn({
  header,
}: HeaderColumnProp<any, unknown>) {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({ id: header.column.id });

  let style1: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s eas-in-out",
    whiteSpace: "noWrap",
    userSelect: "none",
    zIndex: isDragging ? 1 : 0,
    width: header.getSize(),
    gridColumnEnd: "span " + header.colSpan,
  };

  const style = { style1, ...getCommonPinningStyles(header.column) };

  return (
    <TableHead
      ref={setNodeRef}
      style={style}
      className=" text-white bg-slate-700 border-r border-r-slate-500 border-b border-b-slate-500  group cursor-auto"
    >
      {header.isPlaceholder ? null : (
        <>
          {header.column.getCanGroup() ? (
            <button
              {...{
                onClick: header.column.getToggleGroupingHandler(),
                style: {
                  cursor: "pointer",
                },
              }}
            >
              {header.column.getIsGrouped()
                ? `🛑(${header.column.getGroupedIndex()}) `
                : `👊 `}
            </button>
          ) : null}{" "}
          {flexRender(header.column.columnDef.header, header.getContext())}
          <span
            className={`absolute user- top-0 bottom-0 right-0 bg-black opacity-0 w-1 cursor-col-resize hover:opacity-100 ${
              header.column.getIsResizing() ? "opacity-100" : ""
            }`}
            style={{ userSelect: "none", touchAction: "none" }}
            onDoubleClick={() => {
              header.column.resetSize();
              header.getResizeHandler();
            }}
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
          ></span>
          <button {...attributes} {...listeners}>
            🟰
          </button>
        </>
      )}
    </TableHead>
  );
}

export const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
      ? "4px 0 4px -4px gray inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};
