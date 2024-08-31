'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useResetPasswordMutation } from '@/redux/api/password';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';

import PasswordErrorList from '../password-error-list';
import FormControl from '../zod-form-control';
import FollowingConfirmationScreen from './following-confirmation-screen';

const formSchema = z.object({
  oldPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  newPassword: z
    .string()
    .min(6, { message: 'minimum_characters' })
    .regex(/[a-z]/, { message: 'lowercase_character' })
    .regex(/[A-Z]/, { message: 'uppercase_character' })
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: 'special_character' })
    .regex(/[0-9]/, { message: 'one_number' }),
});

type IFormSchema = z.infer<typeof formSchema>;

const errorMessages = {
  minimum_characters: 'Password must be at least 6 characters',
  lowercase_character: 'Password must contain a lowercase character',
  uppercase_character: 'Password must contain an uppercase character',
  special_character: 'Password must contain a special character',
  one_number: 'Password must contain a number',
};

export function ResetPasswordForm({ token }: { token: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    criteriaMode: 'all',
  });
  const [resetPassword, { isLoading, isSuccess, isError }] = useResetPasswordMutation();
  const submitHandler = async (formData: IFormSchema) => {
    resetPassword({ ...formData, token });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Reset password successfully');
    }
    if (isError) {
      toast.error('An error occurred while resetting your password');
    }
  }, [isSuccess, isError]);

  if (isSuccess) {
    return (
      <FollowingConfirmationScreen
        title="Password reset successfully"
        description="You can now log in with your new password."
        buttonText="Go to Login"
        buttonLink="/login"
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="mx-auto grid w-full max-w-[350px] gap-6"
    >
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
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
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={(isDirty && !isValid) || isLoading}
        loading={isLoading}
      >
        {isLoading && <Loader2Icon className="h-5 w-5 animate-spin" />}
        Reset Password
      </Button>
    </form>
  );
}
