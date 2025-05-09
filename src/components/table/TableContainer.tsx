"use client";

import Table from "@/components/table/Table";
import TableSkeleton from "@/components/table/TableSkeleton";
import { AnyColumnDef, CellContext } from "@/types/table";
import { UserListCellContainer } from "./UserListCellContainer";
import { User } from "@/data/users";

import { ErrorState } from "../ui/ErrorState";
import { usePlasmids } from "@/hooks/usePlasmids";

interface PlasmidRow {
  id: string;
  plasmid: string;
  volume: number;
  length: number;
  storage: string;
  editedBy: User[];
}

const columns: AnyColumnDef<PlasmidRow>[] = [
  {
    id: "id",
    header: "ID",
    type: "link",
    getValue: (row) => row.id,
    editable: true,
    width: 200,
  },
  {
    id: "plasmid",
    header: "Plasmid",
    type: "tag",
    getValue: (row) => row.plasmid,
    editable: false,
    width: 250,
  },
  {
    id: "volume",
    header: "Volume (µl)",
    type: "number",
    getValue: (row) => row.volume,
    editable: true,
    width: 120,
  },
  {
    id: "length",
    header: "Length (bp)",
    type: "number",
    getValue: (row) => row.length,
    editable: true,
    width: 120,
  },
  {
    id: "storage",
    header: "Storage location",
    type: "text",
    getValue: (row) => row.storage,
    editable: true,
    width: 180,
  },
  {
    id: "editedBy",
    header: "Edited by",
    type: "text",
    getValue: (row) => row.editedBy,
    editable: true,
    width: 200,
    cell: (ctx: CellContext<PlasmidRow, "editedBy">) => (
      <UserListCellContainer value={ctx.value} onChange={ctx.onChange} />
    ),
  },
];

export default function TableContainer() {
  const { data: tableData, updateData, isLoading, error } = usePlasmids();

  const handleChange = (rowIndex: number, columnId: string, value: unknown) => {
    const updatedData = [...tableData];
    updatedData[rowIndex] = { ...updatedData[rowIndex], [columnId]: value };
    updateData(updatedData);
  };

  if (isLoading) {
    return <TableSkeleton columns={columns} rowCount={8} />;
  }

  if (error) {
    return (
      <ErrorState message="Failed to load plasmids" details={error.message} />
    );
  }

  return <Table columns={columns} data={tableData} onChange={handleChange} />;
}
