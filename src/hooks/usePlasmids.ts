import { useState, useEffect } from "react";
import { PlasmidRow } from "@/app/api/plasmids/route";

interface UsePlasmidsReturn {
  data: PlasmidRow[];
  isLoading: boolean;
  error: Error | null;
  updateData: (updatedData: PlasmidRow[]) => void;
}

export function usePlasmids(): UsePlasmidsReturn {
  const [data, setData] = useState<PlasmidRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPlasmids() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/plasmids");

        if (!response.ok) {
          throw new Error("Failed to fetch plasmids");
        }

        const plasmids: PlasmidRow[] = await response.json();
        setData(plasmids);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlasmids();
  }, []);

  const updateData = (updatedData: PlasmidRow[]) => {
    setData(updatedData);
  };

  return { data, isLoading, error, updateData };
}
