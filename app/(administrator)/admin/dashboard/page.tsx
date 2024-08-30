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

export default function Page() {
  const [getSalesStats, { isLoading, isError, data }] = useLazyGetSalesStatsQuery();

  const salesData = useMemo(() => {
    if (!data?.lastSixMonthsSales) return [];

    const lastSixMonthData = data?.lastSixMonthsSales;
    return [
      {
        id: 'Sales',
        data: lastSixMonthData
          .map((monthData: { month: string; totalSales: number }) => ({
            x: monthData.month,
            y: monthData.totalSales,
          }))
          .reverse(),
      },
    ];
  }, [data]);

  const bookingsData = useMemo(() => {
    if (!data?.topPerformingRooms) return [];

    const topPerformingRooms = data?.topPerformingRooms;
    return topPerformingRooms.map(
      (room: { roomName: string; bookingsCount: number }) => ({
        id: room.roomName,
        value: room.bookingsCount,
      })
    );
  }, [data]);

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
      <div className="grid gap-6 w-full mb-10">
        <div className="flex flex-1">
          <DateRangePicker
            showCompare={false}
            align="start"
            initialDateTo={new Date()}
            initialDateFrom={new Date()}
            onUpdate={dateChangeHandler}
          />
        </div>
        <section className="flex flex-1 gap-6">
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
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Trends</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="w-full h-[400px]" />
              ) : (
                <LineChart className="aspect-[16/9]" data={salesData} />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top performing Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && bookingsData.length > 0 ? (
                <Skeleton className="w-full h-[400px]" />
              ) : (
                <PieChart className="aspect-[16/9]" data={bookingsData} />
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </AdminPageLayout>
  );
}
