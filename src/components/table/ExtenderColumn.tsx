import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "../ui/button";

export const extenderColumn: Partial<ColumnDef<unknown>> = {
  header: () => null,
  cell: ({ row }) => {
    return row.getCanExpand() ? (
      <div
        style={{
          paddingLeft: `${row.depth * 2}rem`,
        }}
      >
        <Button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: "pointer" },
          }}
        >
          {row.getIsExpanded() ? "👇" : "👉"}
        </Button>
      </div>
    ) : (
      "🔵"
    );
  },
};
