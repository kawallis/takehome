export type ColumnType = "text" | "number" | "link" | "tag";

export interface ColumnDef<T, K extends keyof T> {
  id: K;
  header: string;
  type?: ColumnType;
  getValue: (row: T) => T[K];
  editable?: boolean;
  cell?: (ctx: CellContext<T, K>) => React.ReactNode;
  width?: number;
}

export interface CellContext<T, K extends keyof T> {
  value: T[K];
  row: T;
  rowIndex: number;
  editing: boolean;
  onChange: (value: T[K]) => void;
}

export type AnyColumnDef<T> = {
  [K in keyof T]: ColumnDef<T, K>;
}[keyof T];
