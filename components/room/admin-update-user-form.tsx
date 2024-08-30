'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';

import { useCreateRoomMutation, useUpdateRoomMutation } from '@/redux/api/room';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '../ui/form';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { IUser } from '@/backend/models/user';
import { useUpdateUserMutation } from '@/redux/api/auth';

const formSchema = z.object({
  name: z.string().min(2, { message: 'User name can not be less than 2 characters' }),
  email: z.string().email(),
  role: z.union([z.literal('user'), z.literal('admin')]),
});

type IFormSchema = z.infer<typeof formSchema>;

type Props = {
  user?: IUser;
};

export default function AdminUpdateUserForm({ user }: Readonly<Props>) {
  const form = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      role: (user?.role as 'user' | 'admin') ?? 'user',
    },
  });
  const [updateUser, { isSuccess, isError }] = useUpdateUserMutation();

  const submitHandler = async (formData: IFormSchema) => {
    const body = { ...formData } as IFormSchema & { id?: string };
    if (user?._id) body.id = user._id.toString();
    updateUser(body);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('User updated successfully');
    }
    if (isError) {
      toast.error('An error occurred while updating the user');
    }
  }, [isSuccess, isError]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 md:p-0"
        id="admin-user-details-form"
      >
        <div className="grid flex-1 auto-rows-max gap-4">
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex. John Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="example@email.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem className="text-base">
                            <FormLabel>Role</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder="Select the role"
                                    defaultValue={field.value}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {['user', 'admin'].map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
