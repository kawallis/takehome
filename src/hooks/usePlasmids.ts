import { useState, useEffect } from "react";
import { PlasmidRow } from "@/app/api/plasmids/route";

interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface UsePlasmidsReturn {
  data: PlasmidRow[];
  isLoading: boolean;
  error: Error | null;
  updateData: (updatedData: PlasmidRow[]) => void;
  pagination: PaginationInfo;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

export function usePlasmids(): UsePlasmidsReturn {
  const [data, setData] = useState<PlasmidRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const fetchPlasmids = async (page: number, pageSize: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/plasmids?page=${page}&pageSize=${pageSize}`);

      if (!response.ok) {
        throw new Error("Failed to fetch plasmids");
      }

      const result = await response.json();
      setData(result.data);
      setPagination(result.pagination);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlasmids(pagination.page, pagination.pageSize);
  }, [pagination.page, pagination.pageSize]);

  const updateData = (updatedData: PlasmidRow[]) => {
    setData(updatedData);
  };

  const setPage = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const setPageSize = (pageSize: number) => {
    setPagination(prev => ({ ...prev, pageSize, page: 1 }));
  };

  return { data, isLoading, error, updateData, pagination, setPage, setPageSize };
}
