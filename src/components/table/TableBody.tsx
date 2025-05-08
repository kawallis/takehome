"use client";
import { AnyColumnDef } from "@/types/table";
import TableRow from "@/components/table/TableRow";

interface TableBodyProps<T> {
  columns: AnyColumnDef<T>[];
  data: T[];
  onChange: (rowIndex: number, columnId: string, value: T[keyof T]) => void;
}

export default function TableBody<T>({
  columns,
  data,
  onChange,
}: TableBodyProps<T>) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          columns={columns}
          onChange={onChange}
        />
      ))}
    </tbody>
  );
}
