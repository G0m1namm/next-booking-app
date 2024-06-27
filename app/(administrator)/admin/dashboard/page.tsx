import { DateRangePicker } from '@/components/ui/date-range-picker';
import AdminPageLayout from '@/layouts/admin-page-layout';
import React from 'react';

type Props = {};

export default function Page({}: Props) {
  return (
    <AdminPageLayout title="Dashboard">
      <div className="flex">
        <DateRangePicker
          showCompare={false}
          align="start"
          initialDateTo={new Date()}
          initialDateFrom={new Date()}
        />
      </div>
    </AdminPageLayout>
  );
}
