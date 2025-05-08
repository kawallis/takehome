"use client";

import { AnyColumnDef } from "@/types/table";
import TableCell from "@/components/table/TableCell";

interface TableRowProps<T> {
  row: T;
  rowIndex: number;
  columns: AnyColumnDef<T>[];
  onChange: (rowIndex: number, columnId: string, value: T[keyof T]) => void;
}

export default function TableRow<T>({
  row,
  rowIndex,
  columns,
  onChange,
}: TableRowProps<T>) {
  return (
    <tr className="hover:bg-gray-50">
      {columns.map((col) => (
        <TableCell
          key={col.id.toString()}
          column={col}
          row={row}
          rowIndex={rowIndex}
          onChange={onChange}
        />
      ))}
    </tr>
  );
}
