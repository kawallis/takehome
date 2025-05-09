import { NextResponse } from "next/server";
import { users } from "@/data/users";
import { randomUUID } from "crypto";

export interface PlasmidRow {
  id: string;
  plasmid: string;
  volume: number;
  length: number;
  storage: string;
  editedBy: typeof users;
}

// Sample plasmid names for generating data
const plasmidNames = [
  "GT-plasmid-1 snx10PINK c2",
  "GT-plasmid-2 pSAL1",
  "pUC19",
  "pBR322",
  "pET28a",
  "pGEX-6P-1",
  "pMAL-c2X",
  "pFastBac1",
  "pcDNA3.1",
  "pGL4.10",
  "pACYC184",
  "pBAD24",
  "pRS316",
  "pYES2",
  "pGADT7",
  "pGBKT7",
  "pLVX-IRES-ZsGreen1",
  "pLKO.1",
  "pX330",
  "pSpCas9"
];

// Generate a large dataset of plasmids
const generatePlasmidData = (count: number): PlasmidRow[] => {
  const data: PlasmidRow[] = [];
  
  // Include our original two plasmids
  data.push(
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
    }
  );
  
  // Generate additional plasmids
  for (let i = 2; i < count; i++) {
    const plasmidName = plasmidNames[i % plasmidNames.length];
    const variant = Math.floor(i / plasmidNames.length) + 1;
    const name = variant > 1 ? `${plasmidName}-v${variant}` : plasmidName;
    
    data.push({
      id: randomUUID().substring(0, 24),
      plasmid: name,
      volume: Math.floor(Math.random() * 100) + 5,
      length: Math.floor(Math.random() * 15000) + 1000,
      storage: `Freezer ${Math.floor(i / 10) + 1} Box ${String.fromCharCode(65 + (i % 26))}${Math.floor(i % 10) + 1}`,
      editedBy: users.slice(0, Math.floor(Math.random() * users.length) + 1),
    });
  }
  
  return data;
};

// Generate 100 plasmids
const plasmidData: PlasmidRow[] = generatePlasmidData(100);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  
  // Calculate pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = plasmidData.slice(startIndex, endIndex);
  
  return NextResponse.json({
    data: paginatedData,
    pagination: {
      total: plasmidData.length,
      page,
      pageSize,
      totalPages: Math.ceil(plasmidData.length / pageSize),
    }
  });
}
