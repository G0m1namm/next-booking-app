'use client';

import { useFormState } from 'react-dom';

import { useForgotPasswordMutation } from '@/redux/api/password';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import EmailSent from './following-confirmation-screen';

export function ForgotPasswordForm() {
  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();

  const login = (prevState: unknown, formData: FormData) => {
    forgotPassword({
      ...Object.fromEntries(formData),
    });
  };

  const [_, action] = useFormState(login, undefined);

  if (isSuccess) {
    return (
      <EmailSent
        title="Email Sent"
        description="Your email has been sent successfully."
        buttonText="Return to Previous Page"
        buttonLink="/"
      />
    );
  }

  return (
    <div>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email address and we will send you a link to reset your password.
          </p>
        </div>
        <form action={action} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              autoFocus
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading && <Loader2Icon className="h-5 w-5 animate-spin" />}
            Get my link
          </Button>
        </form>
        <div className="text-center text-tiny text-gray-500 dark:text-gray-400">
          Remember your password?{' '}
          <Link
            href="/login"
            className="font-medium underline underline-offset-4"
            prefetch={false}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
