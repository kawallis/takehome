"use client";

import { useState } from "react";
import { ColumnDef, CellContext } from "@/types/table";

interface TableCellProps<T, K extends keyof T> {
  column: ColumnDef<T, K>;
  row: T;
  rowIndex: number;
  onChange: (rowIndex: number, columnId: string, value: T[keyof T]) => void;
}

const cellBaseStyles =
  "h-[28px] w-full box-border text-sm leading-none border border-transparent rounded";

const columnTypeRegistry = {
  text: <T, K extends keyof T>({
    value,
    editing,
    onChange,
  }: CellContext<T, K>) =>
    editing ? (
      <input
        type="text"
        defaultValue={value as string}
        onBlur={(e) => onChange(e.target.value as T[K])}
        className={`${cellBaseStyles} border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
        autoFocus
      />
    ) : (
      <div className={`${cellBaseStyles} truncate`}>{value as string}</div>
    ),

  number: <T, K extends keyof T>({
    value,
    editing,
    onChange,
  }: CellContext<T, K>) =>
    editing ? (
      <input
        type="number"
        defaultValue={value as number}
        onBlur={(e) => onChange(Number(e.target.value) as T[K])}
        className={`${cellBaseStyles} border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
        autoFocus
      />
    ) : (
      <div className={`${cellBaseStyles} truncate`}>{value as number}</div>
    ),

  link: <T, K extends keyof T>({
    value,
    editing,
    onChange,
  }: CellContext<T, K>) =>
    editing ? (
      <input
        type="url"
        defaultValue={value as string}
        onBlur={(e) => onChange(e.target.value as T[K])}
        className={`${cellBaseStyles} border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
        autoFocus
      />
    ) : (
      <div className="flex items-center">
        <a
          href={value as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 truncate inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          {value as string}
        </a>
      </div>
    ),

  tag: <T, K extends keyof T>({
    value,
    editing,
    onChange,
  }: CellContext<T, K>) =>
    editing ? (
      <select
        value={value as string}
        onChange={(e) => onChange(e.target.value as T[K])}
        className={`${cellBaseStyles} border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
        autoFocus
      >
        <option value="active">active</option>
        <option value="paused">paused</option>
        <option value="error">error</option>
      </select>
    ) : (
      <span className="inline-block px-1 bg-gray-100 rounded text-sm text-gray-800 border border-gray-300 truncate">
        {value as string}
      </span>
    ),
};

export default function TableCell<T, K extends keyof T>({
  column,
  row,
  rowIndex,
  onChange,
}: TableCellProps<T, K>) {
  const [editing, setEditing] = useState(false);
  const value = column.getValue(row);

  const handleChange = (newValue: T[K]) => {
    onChange(rowIndex, column.id as string, newValue);
    setEditing(false);
  };

  const ctx: CellContext<T, K> = {
    value,
    row,
    rowIndex,
    editing,
    onChange: handleChange,
  };

  return (
    <td
      style={{ width: column.width ? `${column.width}px` : "224px" }}
      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
      onClick={() => column.editable && setEditing(true)}
    >
      <div className="w-full">
        {column.cell ? (
          column.cell(ctx)
        ) : column.type ? (
          columnTypeRegistry[column.type](ctx)
        ) : (
          <div className={cellBaseStyles}>{String(value)}</div>
        )}
      </div>
    </td>
  );
}
