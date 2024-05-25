'use client';
import { usePagination } from '@mantine/hooks';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

interface Props {
  total: number;
}

export default function Pagination({ total }: Props) {
  const params = useSearchParams();
  const pageParam = params.get('page') || 1;
  const router = useRouter();

  const onPageChange = (page: number) => {
    if (window === undefined) return;
    const path = window.location.pathname;
    const query = new URLSearchParams(window.location.search);
    if (query.has('page')) {
      query.set('page', page.toString());
    } else {
      query.append('page', page.toString());
    }
    const href = `${path}?${query.toString()}`;
    router.push(href);
  };

  const pagination = usePagination({
    total,
    initialPage: parseInt(pageParam as string),
    onChange: onPageChange,
  });

  return (
    <UIPagination className="py-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            isActive
            onClick={pagination.previous}
            disabled={pagination.active === 1}
          />
        </PaginationItem>
        {pagination.range.map((page, idx) => {
          if (page === 'dots') {
            return (
              <PaginationItem key={`pagination-${page}-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={`pagination-${page}`}>
              <PaginationLink
                isActive={pagination.active === page}
                onClick={() => pagination.setPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            isActive
            onClick={pagination.next}
            disabled={pagination.active === total}
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
}
