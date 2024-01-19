"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { ReloadIcon } from "@radix-ui/react-icons"

const FormSchema = z.object({
    review: z
        .string()
        .min(10, {
            message: "Review must be at least 10 characters.",
        })
        .max(1000, {
            message: "Review must not be longer than 1000 characters.",
        }),
})

export function ReviewForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: 'onChange'
    })

    const { isDirty, isValid, isSubmitting } = form.formState;

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values:", {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="review"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Add your review:</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Share your experience with this place"
                                    className="resize-none h-24 w-full"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                <span
                                    className={cn({
                                        'text-muted': field.value?.length === 0,
                                        'text-destructive': field.value?.length > 1000,
                                    })}
                                >{field.value?.length || 0}</span> / 1000
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={!isDirty || !isValid || isSubmitting} type="submit">
                    {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? 'Submitting...' : 'Submit your review'}
                </Button>
            </form>
        </Form>
    )
}
