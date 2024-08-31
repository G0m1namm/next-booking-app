'use client';

import React, { useEffect } from 'react';

import { useRegisterMutation } from '@/redux/api/auth';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function RegisterForm() {
  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();
  const router = useRouter();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData);
    await register(body);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/login');
      toast.success('Your account was created successfully');
    } else if (error && 'data' in error) {
      toast.error((error?.data as { message: string }).message || 'An error occurred');
    }
  }, [isSuccess, error, router]);

  return (
    <form onSubmit={onSubmitHandler} className="mx-auto grid w-full max-w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="name"
            placeholder="John Smith"
            autoFocus
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" required />
        </div>
        <Button type="submit" className="w-full" loading={isLoading} disabled={isLoading}>
          {isLoading && <Loader2Icon className="h-5 w-5 animate-spin" />}
          SignUp
        </Button>
      </div>
      <div className="mt-4 text-center">
        Already have an account?{' '}
        <Link href="/login" className="underline">
          LogIn
        </Link>
      </div>
    </form>
  );
}
