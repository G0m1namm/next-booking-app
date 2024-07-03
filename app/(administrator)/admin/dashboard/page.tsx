'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import AdminPageLayout from '@/layouts/admin-page-layout';
import LineChart from '@/components/dashboard/line-chart';
import PieChart from '@/components/dashboard/pie-chart';
import { useEffect, useMemo } from 'react';
import { useLazyGetSalesStatsQuery } from '@/redux/api/booking';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/utils';

type Props = {};

export default function Page({}: Props) {
  const [getSalesStats, { isLoading, isError, data }] = useLazyGetSalesStatsQuery();

  const salesData = useMemo(() => {
    return [
      {
        id: 'Desktop',
        data: [
          { x: '2018-01-01', y: 7 },
          { x: '2018-01-02', y: 5 },
          { x: '2018-01-03', y: 11 },
          { x: '2018-01-04', y: 9 },
          { x: '2018-01-05', y: 12 },
          { x: '2018-01-06', y: 16 },
          { x: '2018-01-07', y: 13 },
        ],
      },
      {
        id: 'Mobile',
        data: [
          { x: '2018-01-01', y: 9 },
          { x: '2018-01-02', y: 8 },
          { x: '2018-01-03', y: 13 },
          { x: '2018-01-04', y: 6 },
          { x: '2018-01-05', y: 8 },
          { x: '2018-01-06', y: 14 },
          { x: '2018-01-07', y: 11 },
        ],
      },
    ];
  }, []);
  const bookingsData = useMemo(() => {
    return [
      { id: 'Jan', value: 111 },
      { id: 'Feb', value: 157 },
      { id: 'Mar', value: 129 },
      { id: 'Apr', value: 150 },
      { id: 'May', value: 119 },
      { id: 'Jun', value: 72 },
    ];
  }, []);

  const dateChangeHandler = (values: { range: DateRange; rangeCompare?: DateRange }) => {
    if (!values.range.from || !values.range.to) return;

    getSalesStats({
      startDate: values.range.from.toISOString(),
      endDate: values.range.to.toISOString(),
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error('Failed to fetch sales data');
    }
  }, [isError]);

  useEffect(() => {
    getSalesStats({
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    });
  }, []);

  return (
    <AdminPageLayout title="Dashboard">
      <div className="grid gap-6 w-full">
        <div className="flex flex-1">
          <DateRangePicker
            showCompare={false}
            align="start"
            initialDateTo={new Date()}
            initialDateFrom={new Date()}
            onUpdate={dateChangeHandler}
          />
        </div>
        <section className="flex flex-1 gap-10">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="font-light">Total Sales</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-medium">
              {formatPrice(data?.totalSales) ?? <Skeleton className="h-10 w-full" />}
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="font-light">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-medium">
              {data?.numberOfBookings ?? <Skeleton className="h-10 w-full" />}
            </CardContent>
          </Card>
        </section>
        <Card>
          <CardHeader>
            <CardTitle>Sales Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[16/9]" data={salesData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top performing Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart className="aspect-square" data={bookingsData} />
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
}
