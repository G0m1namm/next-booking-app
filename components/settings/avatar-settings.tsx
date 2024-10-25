'use client';

import { useEffect, useState } from 'react';

import { useUpdateAvatarMutation } from '@/redux/api/user';
import { useAppDistpatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { buttonVariants } from '../ui/button';
import { MAX_FILE_SIZE, UPLOAD_AVATAR_PRESET_ID } from '@/lib/constants';
import { useSession } from 'next-auth/react';

export default function AvatarSettings() {
  const [temporalAvatar, setTemporalAvatar] = useState<string | null>(null);
  const router = useRouter();

  const [updateAvatar, { isLoading, isError, isSuccess }] = useUpdateAvatarMutation();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDistpatch();
  const currentSession = useSession();

  const successHandler = async (event: CloudinaryUploadWidgetResults) => {
    if (typeof event.info === 'string' || !event.info) return;
    setTemporalAvatar(event.info.secure_url);
    updateAvatar({ url: event.info.secure_url, public_id: event.info.public_id });
    await currentSession?.update();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Profile avatar updated successfully');
      router.refresh();
    }
    if (isError && !isLoading) {
      toast.error('An error occurred while updating your avatar');
    }
  }, [isSuccess, isError, isLoading, router]);

  return (
    <div className="grid pt-10 gap-10">
      <div className="flex flex-col md:flex-row gap-12 pl-6">
        <div className="flex flex-col gap-2 flex-none items-center">
          <Avatar className="size-28">
            <AvatarImage
              className="object-cover object-center"
              src={temporalAvatar ?? user?.avatar?.url}
              alt="user avatar"
            />
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
