import { Skeleton } from '@/components/ui/skeleton';
import AdminPageLayout from '@/layouts/admin-page-layout';

export default function Loading() {
  return (
    <AdminPageLayout title="">
      <div className="flex justify-between items-center">
        <Skeleton className="w-20 h-10" />
        <Skeleton className="w-10 h-10" />
      </div>
      <Skeleton className="w-full h-[450px] mt-6" />
    </AdminPageLayout>
  );
}
