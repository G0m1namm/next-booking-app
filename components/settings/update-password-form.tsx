'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdatePasswordMutation } from '@/redux/api/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';

import PasswordErrorList from '../password-error-list';
import FormControl from '../zod-form-control';

const formSchema = z
  .object({
    oldPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    newPassword: z
      .string()
      .min(6, { message: 'minimum_characters' })
      .regex(/[a-z]/, { message: 'lowercase_character' })
      .regex(/[A-Z]/, { message: 'uppercase_character' })
      .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: 'special_character' })
      .regex(/[0-9]/, { message: 'one_number' }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

type IFormSchema = z.infer<typeof formSchema>;

const errorMessages = {
  minimum_characters: 'Password must be at least 6 characters',
  lowercase_character: 'Password must contain a lowercase character',
  uppercase_character: 'Password must contain an uppercase character',
  special_character: 'Password must contain a special character',
  one_number: 'Password must contain a number',
};

export function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    criteriaMode: 'all',
  });
  const [updatePassword, { isLoading, isSuccess, isError }] = useUpdatePasswordMutation();
  const submitHandler = async (formData: IFormSchema) => {
    updatePassword(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password updated successfully');
    }
    if (isError) {
      toast.error('An error occurred while updating your password');
    }
  }, [isSuccess, isError]);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="grid gap-6">
        <p className="text-balance text-muted-foreground">
          Enter your new email and click the button to update your profile.
        </p>
        <div className="grid gap-4">
          <FormControl<IFormSchema>
            register={register}
            name="oldPassword"
            label="Old Password"
            errors={errors}
          />
          <FormControl<IFormSchema>
            register={register}
            name="newPassword"
            label="New Password"
          />
          <PasswordErrorList
            errors={errors}
            errorMessages={errorMessages}
            fieldName="newPassword"
          />
          <FormControl<IFormSchema>
            register={register}
            name="confirmNewPassword"
            label="Confirm New Password"
            errors={errors}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={(isDirty && !isValid) || isLoading}
            loading={isLoading}
          >
            {isLoading && <Loader2Icon className="h-5 w-5 animate-spin" />}
            Reset Password
          </Button>
        </div>
      </div>
    </form>
  );
}
