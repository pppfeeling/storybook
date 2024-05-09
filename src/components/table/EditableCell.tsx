import { Column, Row, RowData, Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

type EditableCellProps<TData> = {
  getValue: () => any;
  row: Row<TData>;
  column: Column<TData>;
  table: Table<TData>;
};

export default function EditableCell<TData>({
  getValue,
  row,
  column,
  table,
}: EditableCellProps<TData>) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
}
