"use client";
import { AnyColumnDef } from "@/types/table";
import TableHeader from "@/components/table/TableHeader";
import TableBody from "@/components/table/TableBody";

interface TableProps<T> {
  columns: AnyColumnDef<T>[];
  data: T[];
  onChange: (rowIndex: number, columnId: string, value: T[keyof T]) => void;
}

export default function Table<T>({ columns, data, onChange }: TableProps<T>) {
  return (
    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="shadow ring-1 ring-black/5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <TableHeader columns={columns} />
            <TableBody columns={columns} data={data} onChange={onChange} />
          </table>
        </div>
      </div>
    </div>
  );
}
