import AuthInput from '@/components/auth-input';
import GuestLayout from '@/layouts/guest-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Check, Loader2 } from 'lucide-react';

interface LoginProps {
    canResetPassword: boolean;
}

export default function Login({ canResetPassword }: LoginProps) {
    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="mb-4 text-center text-sm text-muted-foreground">
                Log in to your account
            </div>
            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <LabelPrimitive.Root
                                    htmlFor="email"
                                    className="text-sm leading-none font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Email address
                                </LabelPrimitive.Root>
                                <AuthInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    isError={!!errors.email}
                                />
                                {errors.email && (
                                    <div className="text-sm text-red-500">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <LabelPrimitive.Root
                                        htmlFor="password"
                                        className="text-sm leading-none font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Password
                                    </LabelPrimitive.Root>
                                </div>
                                <AuthInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    isError={!!errors.password}
                                />
                                {errors.password && (
                                    <div className="text-sm text-red-500">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <CheckboxPrimitive.Root
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        className="peer h-4 w-4 shrink-0 rounded-sm border border-border ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                    >
                                        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
                                            <Check className="h-4 w-4" />
                                        </CheckboxPrimitive.Indicator>
                                    </CheckboxPrimitive.Root>
                                    <LabelPrimitive.Root
                                        htmlFor="remember"
                                        className="text-sm leading-none font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Remember me
                                    </LabelPrimitive.Root>
                                </div>
                                {canResetPassword && (
                                    <Link
                                        href={request()}
                                        className="text-sm text-muted-foreground underline hover:text-foreground"
                                        tabIndex={5}
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:brightness-95 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Log in
                            </button>
                        </div>
                        <div className="text-center text-sm text-muted-foreground">
                            Don&apos;t have an account?{' '}
                            <Link
                                href={register()}
                                className="text-foreground underline underline-offset-4 hover:text-primary"
                            >
                                Sign up
                            </Link>
                        </div>
                    </>
                )}
            </Form>
        </GuestLayout>
    );
}
