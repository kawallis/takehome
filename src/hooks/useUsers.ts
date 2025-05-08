import { useState, useEffect } from "react";
import { User } from "@/data/users";

interface UseUsersReturn {
  data: User[];
  isLoading: boolean;
  error: Error | null;
  updateData: (updatedData: User[]) => void;
}

// Module-level cache for users
let usersCache: User[] | null = null;
let cachePromise: Promise<User[]> | null = null;

export function useUsers(): UseUsersReturn {
  const [data, setData] = useState<User[]>(usersCache ?? []);
  const [isLoading, setIsLoading] = useState(usersCache === null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (usersCache !== null) {
      // Already cached, no need to fetch
      setIsLoading(false);
      return;
    }
    if (cachePromise) {
      // Fetch already in progress by another hook instance
      cachePromise.then((users) => {
        setData(users);
        setIsLoading(false);
      });
      return;
    }
    // No cache, fetch and cache the result
    cachePromise = (async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const users: User[] = await response.json();
        usersCache = users;
        setData(users);
        setError(null);
        return users;
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
        setData([]);
        return [];
      } finally {
        setIsLoading(false);
        cachePromise = null;
      }
    })();
  }, []);

  const updateData = (updatedData: User[]) => {
    usersCache = updatedData;
    setData(updatedData);
  };

  return { data, isLoading, error, updateData };
}
