import { Button } from '@/components/ui/button';
import AdminPageLayout from '@/layouts/admin-page-layout';
import Link from 'next/link';
import ErrorPage from '../error';
import { getAuthHeader } from '@/backend/utils/getAuthHeader';
import { getApiUrl } from '@/lib/getBaseUrl';
import { IUser } from '@/backend/models/user';
import AdminUpdateUserForm from '@/components/room/admin-update-user-form';

type Props = {
  params: {
    id: string;
  };
};

const getUserDetails = async (id: string) => {
  const authHeaders = getAuthHeader();
  const res = await fetch(`${getApiUrl()}/admin/users/${id}`, {
    headers: authHeaders.headers,
    next: {
      tags: ['User'],
    },
  });
  const info = await res.json();
  return info;
};

export default async function Page({ params: { id } }: Readonly<Props>) {
  const data = await getUserDetails(id);

  if (!data.success) {
    return <ErrorPage error={data} />;
  }

  const user = data.user as IUser;

  return (
    <AdminPageLayout title={<NewRoonPageHeader />}>
      <AdminUpdateUserForm user={user} />
    </AdminPageLayout>
  );
}

function NewRoonPageHeader() {
  return (
    <div className="flex w-full justify-between items-center">
      <h1 className="text-xl font-semibold md:text-2xl inline-flex items-center gap-3">
        Edit User
      </h1>
      <div className="flex items-center gap-4">
        <Button asChild variant="outline">
          <Link href="/admin/users">Discard</Link>
        </Button>
        <Button type="submit" form="admin-user-details-form">
          Save data
        </Button>
      </div>
    </div>
  );
}
