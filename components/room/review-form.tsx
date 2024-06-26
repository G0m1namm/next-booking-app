'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useCheckCanReviewQuery, useCreateReviewMutation } from '@/redux/api/room';
import { useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { IRoom } from '@/backend/models/room';
import { useRouter } from 'next/navigation';
import { CookieIcon } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const FormSchema = z.object({
  comment: z
    .string()
    .min(10, {
      message: 'Review must be at least 10 characters.',
    })
    .max(1000, {
      message: 'Review must not be longer than 1000 characters.',
    }),
  rating: z.number(),
});

export function ReviewForm({ roomId }: { roomId: Pick<IRoom, '_id'> }) {
  const router = useRouter();
  const [createReview, { isLoading, isError, isSuccess }] = useCreateReviewMutation();
  const { data } = useCheckCanReviewQuery({ roomId });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
  });

  const canReview = data?.canReview;

  const { isDirty, isValid } = form.formState;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createReview({ roomId, ...data });
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      router.refresh();
      toast.success('Review submitted successfully');
    }
    if (isError) {
      toast.error('Failed to submit review');
    }
  }, [isSuccess, isError]);

  if (canReview === undefined) {
    return (
      <div className="w-full grid gap-4">
        <Skeleton className="h-4 rounded-md" />
        <Skeleton className="h-10 rounded-md" />
      </div>
    );
  }

  if (canReview === false) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <Alert className="border-violet-500/50 text-violet-500 dark:border-violet-500 bg-violet-100/30 flex flex-wrap items-center gap-6 w-fit">
          <AlertTitle>How will you rate this room?</AlertTitle>
          <AlertDescription>
            <Rating
              initialValue={0}
              allowFraction
              onClick={(rate) => form.setValue('rating', rate)}
              style={{ overflow: 'hidden' }}
              emptyClassName="[&_svg]:text-violet-500/20 [&_svg]:!inline-flex"
              fillClassName="[&_svg]:text-violet-500 [&_svg]:!inline-flex"
              tooltipClassName="!bg-violet-600"
              showTooltip
              tooltipArray={[
                'Terrible',
                'Terrible+',
                'Bad',
                'Bad+',
                'Average',
                'Average+',
                'Great',
                'Great+',
                'Awesome',
                'Awesome+',
              ]}
            />
          </AlertDescription>
        </Alert>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Share your experience with this place"
                  className="resize-none h-24 w-full text-base placeholder:text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                <span
                  className={cn({
                    'text-muted': field.value?.length === 0,
                    'text-destructive': field.value?.length > 1000,
                  })}
                >
                  {field.value?.length || 0}
                </span>{' '}
                / 1000
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!isDirty || !isValid || isLoading} type="submit">
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Submitting...' : 'Submit your review'}
        </Button>
      </form>
    </Form>
  );
}
