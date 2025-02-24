import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import type { infer as zodInfer } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/config/schemas'
import { useLoginMutation } from '@/store/api'

type FormData = zodInfer<typeof loginSchema>

export const Login = () => {
    const navigate = useNavigate()

    const form = useForm<FormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onSubmit',
        shouldFocusError: true
    })

    const [login, { isLoading }] = useLoginMutation()

    const handleLogin = async (data: FormData) => {
        try {
            await login(data).unwrap()

            navigate('/')
        } catch (error) {
            error
        }
    }

    const onSubmit: SubmitHandler<FormData> = (formData) => handleLogin(formData)

    return (
        <div className='flex h-screen items-center justify-center'>
            <div className='mx-auto w-[300px]'>
                <Form {...form}>
                    <form
                        className='space-y-5'
                        onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            disabled={isLoading}
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='nickname@gmail.com'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled={isLoading}
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='.......'
                                            type='password'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className='w-full'
                            disabled={isLoading}
                            type='submit'>
                            {isLoading ? (
                                <Loader2 className='h-4 w-4 animate-spin' />
                            ) : (
                                'Log In'
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
