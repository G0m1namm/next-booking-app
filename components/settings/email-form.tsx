'use client';

import { useEffect, useState } from 'react';

import { useLazyUpdateSessionQuery, useUpdateProfileMutation } from '@/redux/api/user';
import { setUser } from '@/redux/features/user/user-slice';
import { useAppDistpatch, useAppSelector } from '@/redux/hooks';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function EmailForm() {
  const [email, setEmail] = useState<string>('');
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const dispatch = useAppDistpatch();

  const [updateProfile, { isLoading, isSuccess, isError }] = useUpdateProfileMutation();
  const [updateSession, { data: sessionData }] = useLazyUpdateSessionQuery();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    await updateProfile({ email });
  };

  if (sessionData) dispatch(setUser(sessionData?.user));

  useEffect(() => {
    if (currentUser?.email) {
      setEmail(currentUser.email);
    }
  }, [currentUser?.email]);

  useEffect(() => {
    if (isSuccess) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      updateSession();
      router.refresh();
      toast.success('Profile updated successfully');
    }
    if (isError && !isLoading) {
      toast.error('An error occurred while updating your profile');
    }
  }, [isSuccess, isError, isLoading, router, updateSession]);

  return (
    <form onSubmit={submitHandler}>
      <div className="grid gap-6">
        <p className="text-balance text-muted-foreground">
          Enter your new email and click the button to update your profile.
        </p>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Name</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
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
            Update
          </Button>
        </div>
      </div>
    </form>
  );
}
