import TableContainer from "@/components/table/TableContainer";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Table Component</h1>
      </header>
      <main>
        <TableContainer />
      </main>
    </div>
  );
}
