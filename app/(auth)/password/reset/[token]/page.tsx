import Image from 'next/image';

import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

type Props = {
  params: {
    token: string;
  };
};

export default function Page({ params: { token } }: Props) {
  return (
    <div className="w-full h-dvh lg:grid lg:grid-cols-2">
      <span className="fixed top-4 left-4 z-10 cursor-pointer text-lg font-playfair text-violet-500">
        <Link href="/">Home&Fun</Link>
      </span>
      <ScrollArea>
        <main className="h-full w-full min-h-dvh py-12 flex items-center">
          <ResetPasswordForm token={token} />
        </main>
      </ScrollArea>
      <div className="hidden bg-muted lg:block h-full relative w-full">
        <Image
          src="https://res.cloudinary.com/ds7aawikt/image/upload/v1725079762/4_sn5hge.webp"
          alt="Image"
          width="1920"
          height="1080"
          className="absolute left-0 top-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
