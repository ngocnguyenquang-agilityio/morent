'use client';

// Libraries
import { cn } from '@/lib/utils';

// Utils
import { getPageNumbers } from '@/utils/pagination';

// Icons
import { ChevronBackwardIcon, ChevronForwardIcon } from '@/components/icons';

// Components
import { Button } from '@/components/ui';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  page,
  pageCount,
  onPageChange,
  className,
}: PaginationProps) => {
  const totalPages = pageCount;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onPageChange?.(newPage);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const handleChangePageByStep = (step: 1 | -1) => () =>
    handlePageChange(page + step);

  return (
    <div
      aria-label="Pagination"
      role="navigation"
      className={cn(
        'flex items-center justify-center sm:justify-end gap-3 mt-8',
        className,
      )}
    >
      <Button
        variant="ghost"
        onClick={handleChangePageByStep(-1)}
        disabled={page <= 1}
        aria-label="Go to previous page"
        className="px-4 py-5 group flex items-center gap-2 text-sm font-medium text-secondary"
      >
        <ChevronBackwardIcon className="fill-secondary" />
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {getPageNumbers(totalPages).map((pageNum) => {
          const isActive = page === pageNum;

          return (
            <Button
              key={pageNum}
              variant={isActive ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handlePageChange(pageNum)}
              aria-label={`Page ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'w-10 h-10 rounded-[10px] text-sm font-medium text-secondary',
                {
                  'bg-primary text-white hover:bg-blue-60': isActive,
                },
              )}
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      <Button
        variant="ghost"
        onClick={handleChangePageByStep(1)}
        disabled={page === totalPages}
        aria-label="Go to next page"
        className="px-4 py-5 group flex items-center gap-2 text-sm font-medium text-secondary"
      >
        Next
        <ChevronForwardIcon className="fill-secondary" />
      </Button>
    </div>
  );
};
