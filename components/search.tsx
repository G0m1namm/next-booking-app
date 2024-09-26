'use client';

import { useDebouncedCallback } from '@mantine/hooks';
import { ListFilter, SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from './ui/input';
import { Label } from './ui/label';
import RoomFilters from './room/room-filters';

export default function Search() {
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (window === undefined) return;
    const searchParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    if (searchParams.has('name')) {
      searchParams.set('name', e.target.value);
    } else {
      searchParams.append('name', e.target.value);
    }

    if (!e.target.value) {
      searchParams.delete('name');
    }
    const href = `${path}?${searchParams.toString()}`;
    router.push(href);
  };

  const debounedSearch = useDebouncedCallback(handleSearchChange, 500);

  return (
    <div className="flex w-full items-center gap-4 rounded-md px-4">
      <div className="flex-none">
        <RoomFilters />
      </div>
      <div className="flex flex-1 gap-2 items-center rounded-sm">
        <SearchIcon size={24} className="text-black inline-flex shrink-0 flex-none" />
        <div className="flex-1">
          <Label htmlFor="rooms_search" className="sr-only">
            Search
          </Label>
          <Input
            id="rooms_search"
            placeholder="Search accommodations"
            type="search"
            className="w-full outline-none border-none shadow-none focus:!shadow-none focus:!border-none focus-visible:!shadow-none focus-visible:!outline-none focus-visible:ring-0"
            onChange={debounedSearch}
          />
        </div>
      </div>
    </div>
  );
}
