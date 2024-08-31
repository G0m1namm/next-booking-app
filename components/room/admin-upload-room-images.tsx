'use client';

import { IImage, IRoom } from '@/backend/models/room';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2Icon, UploadIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { CldUploadButton, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import {
  useDeleteRoomImageMutation,
  useUploadRoomImagesMutation,
} from '@/redux/api/room';
import Image from 'next/image';
import { UPLOAD_ROOMS_PRESET_ID } from '@/lib/constants';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAppDistpatch } from '@/redux/hooks';
import { setBreadcrumbs } from '@/redux/features/breadcrumbs/breadcrumbs-slice';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

type Props = {
  room: IRoom;
};

export default function AdminUploadRoomImages({ room }: Readonly<Props>) {
  const initialImages = room.images || [];
  const [temporalImagePreviews, setTemporalImagePreviews] =
    React.useState<IImage[]>(initialImages);
  const [uploadImages, { isLoading, isError, isSuccess }] = useUploadRoomImagesMutation();
  const [deleteImage, { isLoading: isDeletingImage }] = useDeleteRoomImageMutation();
  const router = useRouter();
  const dispatch = useAppDistpatch();
  const params = useParams();

  const getImageId = (imageId: string) => {
    deleteImage({ id: room._id, imageId });
    setTemporalImagePreviews((prev) => prev.filter((item) => item.public_id !== imageId));
  };

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        { href: '/admin/rooms', label: 'Rooms' },
        { href: `/admin/rooms/${params?.id}`, label: `Room ${room?.name}` },
        { href: '', label: `Upload images` },
      ])
    );
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Images uploaded successfully');
    }
    if (isError && !isLoading) {
      toast.error('An error occurred while uploading your images');
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardDescription>
            Add images to your room. You can upload multiple images at once.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 bg-muted/20 transition-colors hover:border-primary hover:bg-muted/30 relative">
            <div className="grid gap-2 text-center">
              <UploadIcon className="mx-auto h-8 w-8 text-muted-foreground" />
              <div className="text-tiny font-medium text-muted-foreground">
                Click to upload images
              </div>
            </div>
            <CldUploadButton
              className="absolute inset-0 z-10 h-full w-full opacity-0 cursor-pointer"
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(event) => {
                const imageData = event.info;
                if (typeof imageData === 'string' || imageData == null) return;
                const newImage = {
                  url: imageData.secure_url,
                  public_id: imageData.public_id,
                } as IImage;
                setTemporalImagePreviews((prev) => [...prev, newImage]);
              }}
              onQueuesEnd={function (event) {
                const info = event.info as CloudinaryUploadWidgetInfo;
                if ('files' in info) {
                  const newImages = (info.files as any).map((file: any) => ({
                    public_id: file.uploadInfo.public_id,
                    url: file.uploadInfo.url,
                  }));

                  uploadImages({
                    id: room._id,
                    images: [...temporalImagePreviews, ...newImages],
                  });
                  router.refresh();
                }
              }}
              uploadPreset={UPLOAD_ROOMS_PRESET_ID} // preset for rooms
              options={{ maxFileSize: MAX_FILE_SIZE, multiple: true }}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Images</CardTitle>
          <CardDescription>View and manage your uploaded images.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {temporalImagePreviews.map(({ url, public_id }) => (
              <div key={`room-image-${crypto.randomUUID()}`} className="relative group">
                <Link
                  href={url}
                  target="_blank"
                  className="absolute inset-0 z-10"
                  prefetch={false}
                >
                  <span className="sr-only">View image</span>
                </Link>
                <Image
                  src={url}
                  alt="Image"
                  width={300}
                  height={300}
                  className="aspect-square rounded-lg object-cover group-hover:opacity-50 transition-opacity bg-slate-400"
                />
                <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 bg-background/80 text-muted-foreground hover:bg-background"
                    disabled={isDeletingImage}
                    onClick={() => getImageId(public_id)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
