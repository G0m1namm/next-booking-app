'use client';

import { useEffect, useState } from 'react';

import { useLazyUpdateSessionQuery, useUpdateAvatarMutation } from '@/redux/api/user';
import { setUser } from '@/redux/features/user/user-slice';
import { useAppDistpatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { buttonVariants } from '../ui/button';
import { UPLOAD_AVATAR_PRESET_ID } from '@/lib/constants';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function AvatarSettings() {
  const [temporalAvatar, setTemporalAvatar] = useState<string | null>(null);
  const router = useRouter();

  const [updateAvatar, { isLoading, isError, isSuccess }] = useUpdateAvatarMutation();
  const [updateSession, { data: sessionData }] = useLazyUpdateSessionQuery();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDistpatch();

  if (sessionData) dispatch(setUser(sessionData?.user));

  const successHandler = (event: CloudinaryUploadWidgetResults) => {
    if (typeof event.info === 'string' || !event.info) return;
    setTemporalAvatar(event.info.secure_url);
    updateAvatar({ url: event.info.secure_url, public_id: event.info.public_id });
  };

  useEffect(() => {
    if (isSuccess) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      updateSession();
      router.refresh();
      toast.success('Profile avatar updated successfully');
    }
    if (isError && !isLoading) {
      toast.error('An error occurred while updating your avatar');
    }
  }, [isSuccess, isError, isLoading, router, updateSession]);

  return (
    <div className="grid pt-10 gap-10">
      <div className="flex flex-col md:flex-row gap-12 pl-6">
        <div className="flex flex-col gap-2 flex-none items-center">
          <Avatar className="size-28">
            <AvatarImage src={temporalAvatar ?? user?.avatar?.url} alt="user avatar" />
            <AvatarFallback>
              <Image
                src="/images/avatar.jpg"
                alt="user avatar"
                width={112}
                height={112}
                className="rounded-full"
              />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="grid gap-4">
          <h2 className="text-base font-semibold">Upload New Image</h2>
          <div className="grid gap-2">
            <CldUploadButton
              className={cn(buttonVariants({ variant: 'default', size: 'default' }))}
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={successHandler}
              uploadPreset={UPLOAD_AVATAR_PRESET_ID} // preset for avatar
              options={{ maxFileSize: MAX_FILE_SIZE, multiple: false }}
            />
            <p className="text-tiny text-gray-500 dark:text-gray-400">
              Maximum file size: 5MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
