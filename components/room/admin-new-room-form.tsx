'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';

import { useCreateRoomMutation } from '@/redux/api/room';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '../ui/form';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import CurrenyInput from '../ui/currency-input';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z
    .string()
    .min(12, { message: 'Room name can not be less than 12 characters' })
    .max(200, { message: 'Room name can not exceed 200 characters' }),
  description: z
    .string()
    .min(100, { message: 'Use a minimum of 100 characters' })
    .max(1000, { message: 'Use a maximum of 1000 characters' }),
  pricePerNight: z.number().min(0),
  address: z.string().min(6, { message: 'Add an specific address' }),
  category: z.union([z.literal('King'), z.literal('Single'), z.literal('Twins')]),
  guestCapacity: z.coerce
    .number()
    .min(1, { message: 'At least it should have one guest' }),
  numOfBeds: z.coerce.number().min(1, { message: 'At least it should have one bed' }),
  isInternet: z.boolean(),
  isBreakfast: z.boolean(),
  isAirConditioned: z.boolean(),
  isPetAllowed: z.boolean(),
  isRoomCleaning: z.boolean(),
});

type IFormSchema = z.infer<typeof formSchema>;

type RoomFeaturesType = Pick<
  IFormSchema,
  'isAirConditioned' | 'isBreakfast' | 'isInternet' | 'isPetAllowed' | 'isRoomCleaning'
>;

const roomFeatures = [
  {
    control: 'isInternet',
    label: 'Internet',
    description: 'High-speed internet access',
  },
  {
    control: 'isBreakfast',
    label: 'Breakfast',
    description: 'Complimentary breakfast',
  },
  {
    control: 'isAirConditioned',
    label: 'Air Conditioned',
    description: 'Air conditioning available in the room',
  },
  {
    control: 'isPetAllowed',
    label: 'Pet Allowed',
    description: 'Pets are allowed in the room',
  },
  {
    control: 'isRoomCleaning',
    label: 'Room Cleaning',
    description: 'Regular room cleaning service',
  },
];

export default function AdminNewRoomForm() {
  const router = useRouter();
  const form = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      pricePerNight: 0,
      address: '',
      category: 'Single',
      guestCapacity: 0,
      numOfBeds: 0,
      isInternet: false,
      isBreakfast: false,
      isAirConditioned: false,
      isPetAllowed: false,
      isRoomCleaning: false,
    },
  });
  const [createRoom, { isSuccess, isError, error }] = useCreateRoomMutation();
  const submitHandler = async (formData: IFormSchema) => {
    createRoom(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Room created successfully');
      router.replace('/admin/rooms');
    }
    if (isError) {
      console.log(error);

      toast.error('An error occurred while creating your room');
    }
  }, [isSuccess, isError]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 md:p-0"
        id="admin-new-room-form"
      >
        <div className="grid flex-1 auto-rows-max gap-4">
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>
                    Descriptive information that will help guests understand the room
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Room Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ex. Luxury room with panoramic view"
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
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ex. Located in the heart of the city, this room offers a breathtaking view of the skyline"
                                className="resize-none h-24 w-full text-base placeholder:text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              <span
                                className={cn({
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
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Room Details</CardTitle>
                  <CardDescription>
                    Additional information about the room that will help guests make a
                    decision
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-3">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex. 4667 Bicetown Street, New York, NY, 10004"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Try to be as specific as possible, including the city and
                            postal code
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <CurrenyInput
                      form={form}
                      label="Room price per night"
                      name="pricePerNight"
                      placeholder="1000"
                    />
                    <FormField
                      control={form.control}
                      name="guestCapacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guest Capacity</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} {...field} />
                          </FormControl>
                          <FormDescription>
                            Specify how many guests can stay in this room
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="numOfBeds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of beds</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Room Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="text-base">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder="Select the category"
                                defaultValue={field.value}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {['King', 'Single', 'Twins'].map((category) => (
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Room Ammenities</CardTitle>
                  <CardDescription>
                    Select the features that are included in the room
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {roomFeatures.map(({ control, label, description }) => (
                      <FormField
                        key={control}
                        control={form.control}
                        name={control as keyof RoomFeaturesType}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>{label}</FormLabel>
                              <FormDescription>{description}</FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
