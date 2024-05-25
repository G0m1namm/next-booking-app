'use client';

import { useDebouncedCallback } from '@mantine/hooks';
import { ListFilter, SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function Search() {
  const router = useRouter();

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (window === undefined) return;
    const searchParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    if (searchParams.has('location')) {
      searchParams.set('location', e.target.value);
    } else {
      searchParams.append('location', e.target.value);
    }
    const href = `${path}?${searchParams.toString()}`;
    router.push(href);
  };

  const debounedSearch = useDebouncedCallback(
    handleSearchChange,
    500
  );

  return (
    <div>
      <div className="flex gap-4 rounded-md p-2 shadow focus-within:shadow-lg transition-shadow duration-300 ease-linear">
        <div className="flex gap-2 items-center p-1 rounded-sm">
          <SearchIcon
            size={24}
            className="text-black inline-flex shrink-0 flex-none"
          />
          <div>
            <Label htmlFor="rooms_search" className="sr-only">
              Search
            </Label>
            <Input
              id="rooms_search"
              placeholder="Search accommodations"
              type="search"
              className="outline-none border-none shadow-none focus:shadow-none focus:border-none focus-visible:ring-ring focus:w-[250px] transition-[width] duration-300 ease"
              onChange={debounedSearch}
            />
          </div>
        </div>
        <Button variant="ghost">
          <ListFilter size={24} className="mr-2" />
          Filters
        </Button>
      </div>
    </div>
  );
}
