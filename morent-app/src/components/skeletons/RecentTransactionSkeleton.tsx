import { Skeleton } from '@/components/ui/Skeleton';

export const RecentTransactionSkeleton = () => (
  <ul className="flex flex-col">
    {[0, 1, 2, 3].map((i) => (
      <li key={i}>
        <div className="flex items-center gap-4 py-4">
          <Skeleton className="w-[100px] h-[60px] rounded-md shrink-0" />
          <div className="flex flex-1 items-center justify-between min-w-0">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20 mt-1" />
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-16 mt-1" />
            </div>
          </div>
        </div>
        {i < 3 && <hr className="border-secondary-100" />}
      </li>
    ))}
  </ul>
);
