"use client";

import { useState, useRef, useEffect } from "react";
import { User } from "@/data/users";
import { useUsers } from "@/hooks/useUsers";
import { UserPill } from "./UserPill";
import { OverflowPill } from "./OverflowPill";
import { UserSearchDropdown } from "./UserSearchDropdown";

export interface UserListCellProps {
  value: User[];
  onChange: (value: User[]) => void;
}

export function UserListCell({ value, onChange }: UserListCellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleUsers, setVisibleUsers] = useState<User[]>(value);
  const [overflowCount, setOverflowCount] = useState(0);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(false);

  const { data: allUsers, isLoading, error } = useUsers();

  const handleSelect = (user: User) => {
    const isSelected = value.some((u) => u.id === user.id);
    let newSelectedUsers: User[];

    if (isSelected) {
      if (value.length === 1) {
        return;
      }
      newSelectedUsers = value.filter((u) => u.id !== user.id);
    } else {
      newSelectedUsers = [...value, user];
    }

    onChange(newSelectedUsers);
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const userElements = container.querySelectorAll(".user-item");

      // Get the width of a single user item (avatar + name + gap)
      const singleUserWidth =
        userElements[0]?.getBoundingClientRect().width || 0;
      const gapWidth = 8; // 2 * 4px gap
      const pillWidth = 40; // Approximate width of the overflow pill

      // Calculate how many users can fit
      const availableWidth = containerWidth - pillWidth;
      const maxUsers = Math.floor(
        availableWidth / (singleUserWidth + gapWidth)
      );

      const visibleCount = Math.max(1, Math.min(maxUsers, value.length));
      setVisibleUsers(value.slice(0, visibleCount));
      setOverflowCount(value.length - visibleCount);
    };

    // Initial check
    checkOverflow();

    // Set up resize observer
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [value]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex items-center gap-2 w-full cursor-pointer"
        onClick={() => setEditing(!editing)}
      >
        {visibleUsers.map((user) => (
          <UserPill key={user.id} user={user} />
        ))}
        {overflowCount > 0 && (
          <OverflowPill
            count={overflowCount}
            users={value.slice(visibleUsers.length)}
          />
        )}
      </div>

      {isLoading ? (
        <div className="p-2">Loading users...</div>
      ) : error ? (
        <div className="p-2 text-red-500">Failed to load users</div>
      ) : (
        <UserSearchDropdown
          isOpen={editing}
          users={allUsers}
          selectedUsers={value}
          query={query}
          onQueryChange={setQuery}
          onUserSelect={handleSelect}
          onClose={() => {
            setEditing(false);
            setQuery("");
          }}
        />
      )}
    </div>
  );
}
