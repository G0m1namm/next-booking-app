import Image from 'next/image';

import { LoginForm } from '@/components/auth/login-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="w-full h-dvh lg:grid lg:grid-cols-2">
      <span className="fixed top-4 left-4 z-10 cursor-pointer text-lg text-violet-500">
        <Link href="/" className="font-playfair">
          Home&Fun
        </Link>
      </span>
      <ScrollArea>
        <main className="h-full w-full min-h-dvh py-12 flex items-center">
          <LoginForm />
        </main>
      </ScrollArea>
      <div className="hidden bg-muted lg:block h-full relative w-full">
        <Image
          src="https://res.cloudinary.com/ds7aawikt/image/upload/v1725079762/3_susxwu.webp"
          alt="Image"
          width="1920"
          height="1080"
          className="absolute left-0 top-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
