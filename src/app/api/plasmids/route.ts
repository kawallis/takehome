import { NextResponse } from "next/server";
import { users } from "@/data/users";

export interface PlasmidRow {
  id: string;
  plasmid: string;
  volume: number;
  length: number;
  storage: string;
  editedBy: typeof users;
}

const plasmidData: PlasmidRow[] = [
  {
    id: "ac5f064e-d0de-4f58-98ba",
    plasmid: "GT-plasmid-1 snx10PINK c2",
    volume: 50,
    length: 14813,
    storage: "Freezer 2 Box A1",
    editedBy: users.slice(0, 4),
  },
  {
    id: "230755be-a90b-4ea6-a9cf",
    plasmid: "GT-plasmid-2 pSAL1",
    volume: 20,
    length: 10794,
    storage: "Freezer 2 Box A2",
    editedBy: [users[0]],
  },
];

export async function GET() {
  return NextResponse.json(plasmidData);
}
