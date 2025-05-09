"use client";

import { AnyColumnDef } from "@/types/table";

interface TableSkeletonProps<T> {
  columns: AnyColumnDef<T>[];
  rowCount?: number;
}

export default function TableSkeleton<T>({
  columns,
  rowCount = 5,
}: TableSkeletonProps<T>) {
  return (
    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="shadow ring-1 ring-black/5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id.toString()}
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    style={{ width: column.width }}
                  >
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array(rowCount)
                .fill(0)
                .map((_, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td
                        key={`${rowIndex}-${column.id.toString()}`}
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >
                        <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${Math.max(50, Math.min(column.width ? column.width - 20 : 100, 200))}px` }}></div>
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
