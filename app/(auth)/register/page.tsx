import Image from 'next/image';

import RegisterForm from '@/components/auth/register-form';

export default function Page() {
  return (
    <div className="w-full h-dvh lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <RegisterForm />
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://res.cloudinary.com/ds7aawikt/image/upload/v1725048780/premium_photo-1689609950112-d66095626efb_fnsuwv.avif"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
