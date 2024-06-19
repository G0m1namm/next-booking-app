/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ktOeOa4GN4O
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import Link from 'next/link';

import { cn } from '@/lib/utils';

import { buttonVariants } from '../ui/button';

interface FollowingConfirmationScreenProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
}

export default function FollowingConfirmationScreen({
  title,
  description,
  buttonText,
  buttonLink,
}: FollowingConfirmationScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md w-full p-8 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <CircleCheckIcon className="text-green-500 h-12 w-12" />
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">{title}</h2>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
        </div>

        <Link href={buttonLink} className={cn('w-full', buttonVariants())}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

function CircleCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
