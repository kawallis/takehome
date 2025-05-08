import TableContainer from "@/components/table/TableContainer";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Table Component</h1>
        <a
          href="https://github.com/kawallis/takehome"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-blue-600 hover:underline font-medium text-base border border-blue-600 rounded px-3 py-1 transition-colors duration-150 hover:bg-blue-50"
        >
          View on GitHub
        </a>
      </header>
      <main>
        <TableContainer />
      </main>
    </div>
  );
}
