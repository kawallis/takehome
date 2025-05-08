"use client";

import { AnyColumnDef } from "@/types/table";

interface TableHeaderProps<T> {
  columns: AnyColumnDef<T>[];
}

export default function TableHeader<T>({ columns }: TableHeaderProps<T>) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((col) => (
          <th
            key={col.id.toString()}
            style={{ width: col.width ? `${col.width}px` : "224px" }}
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
