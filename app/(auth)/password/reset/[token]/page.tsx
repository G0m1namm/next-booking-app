import Image from 'next/image';

import { ResetPasswordForm } from '@/components/auth/reset-password-form';

type Props = {
  params: {
    token: string;
  };
};

export default function Page({ params: { token } }: Props) {
  return (
    <div className="w-full h-dvh lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <ResetPasswordForm token={token} />
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
