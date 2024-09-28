import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="w-full flex flex-col min-h-svh pt-20">
      <div className="mb-5">
        <Skeleton className="w-10 h-5" />
      </div>
      <div className="flex gap-3 flex-col mb-10">
        <Skeleton className="w-1/2 h-5" />
        <Skeleton className="w-full h-7" />
      </div>
      <Skeleton className="w-full h-[400px]" />
      <div className="flex flex-col md:flex-row w-full my-10 gap-10">
        <div className="flex-1">
          <Skeleton className="w-full h-[200px]" />
        </div>
        <aside className="grid top-0 flex-none w-fit gap-10">
          <Skeleton className="w-full h-[200px]" />
        </aside>
      </div>
    </div>
  );
}
