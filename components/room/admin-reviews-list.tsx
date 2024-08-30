import { ColumnDef } from '@tanstack/react-table';

import RoomsDataTable from './rooms-data-table';
import { ReviewData } from '@/app/(administrator)/admin/rooms/[id]/reviews/columns';

type Props = {
  data: ReviewData[];
  columns: ColumnDef<ReviewData>[];
};

export default function AdminReviewsList({ data, columns }: Readonly<Props>) {
  return <RoomsDataTable data={data} columns={columns} />;
}
