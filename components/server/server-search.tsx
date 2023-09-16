"use client";

import { SearchIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useParams, useRouter } from "next/navigation";

type Type = "channel" | "member";

interface PropsType {
  data: {
    label: string;
    type: Type;
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const ServerSearch = ({ data }: PropsType) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);

  const down = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  }, []);

  const onClick = ({ id, type }: { id: string; type: Type }) => {
    setOpen(false);

    if (!params?.serverId) return;
    if (type === "member")
      return router.push(`/server/${params.serverId}/conversations/${id}`);

    if (type === "channel")
      return router.push(`/servers/${params.serverId}/channels/${id}`);
  };

  useEffect(() => {
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [down]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
      >
        <SearchIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <p className="text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300">
          Search
        </p>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span>⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;
            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ id, type })}
                    >
                      {icon} <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
