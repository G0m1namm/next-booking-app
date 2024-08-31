import { getAuthHeader } from '@/backend/utils/getAuthHeader';

import { getApiUrl } from '@/lib/getBaseUrl';

import { columns } from './columns';
import ErrorPage from './error';
import AdminPageLayout from '@/layouts/admin-page-layout';
import { Badge } from '@/components/ui/badge';
import { IUser } from '@/backend/models/user';
import AdminUsersList from '@/components/room/admin-users-list';

export const metadata = {
  title: 'All Users | Administrator',
  description: 'Manage all users in the system.',
};

const getAllUsers = async () => {
  const authHeaders = getAuthHeader();
  const res = await fetch(`${getApiUrl()}/admin/users`, {
    headers: authHeaders.headers,
    next: {
      tags: ['Users'],
    },
  });
  const info = await res.json();
  return info;
};

export default async function Page() {
  const data = await getAllUsers();

  if (!data.success) {
    return <ErrorPage error={data} />;
  }

  const users = data.users as IUser[];
  const usersDataParsed = users.map((user) => {
    return {
      id: user._id?.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  });

  return (
    <AdminPageLayout title={<PageHeader totalUsers={users.length} />}>
      <AdminUsersList data={usersDataParsed} columns={columns} />
    </AdminPageLayout>
  );
}

function PageHeader({ totalUsers }: Readonly<{ totalUsers: number }>) {
  return (
    <div className="flex w-full justify-between items-center">
      <h1 className="text-xl font-semibold md:text-2xl inline-flex items-center gap-3">
        <span>All Users</span>
        <Badge className="inline-block text-lg">{totalUsers}</Badge>
      </h1>
    </div>
  );
}
