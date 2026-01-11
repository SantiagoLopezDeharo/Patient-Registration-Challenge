import AuthInput from '@/components/auth-input';
import GuestLayout from '@/layouts/guest-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head, Link } from '@inertiajs/react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Loader2 } from 'lucide-react';

export default function Register() {
    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-4 text-center text-sm text-muted-foreground">
                Create an account
            </div>

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <LabelPrimitive.Root
                                    htmlFor="name"
                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Name
                                </LabelPrimitive.Root>
                                <AuthInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    placeholder="John Doe"
                                    isError={!!errors.name}
                                />
                                {errors.name && (
                                    <div className="text-sm text-red-500">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <LabelPrimitive.Root
                                    htmlFor="email"
                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Email address
                                </LabelPrimitive.Root>
                                <AuthInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    placeholder="name@example.com"
                                    isError={!!errors.email}
                                />
                                {errors.email && (
                                    <div className="text-sm text-red-500">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <LabelPrimitive.Root
                                    htmlFor="password"
                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Password
                                </LabelPrimitive.Root>
                                <AuthInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    placeholder="Password"
                                    isError={!!errors.password}
                                />
                                {errors.password && (
                                    <div className="text-sm text-red-500">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <LabelPrimitive.Root
                                    htmlFor="password_confirmation"
                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Confirm Password
                                </LabelPrimitive.Root>
                                <AuthInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    placeholder="Confirm Password"
                                    isError={!!errors.password_confirmation}
                                />
                                {errors.password_confirmation && (
                                    <div className="text-sm text-red-500">
                                        {errors.password_confirmation}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:brightness-95 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                tabIndex={5}
                                disabled={processing}
                            >
                                {processing && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Create account
                            </button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link
                                href={login()}
                                className="text-foreground underline underline-offset-4 hover:text-primary"
                            >
                                Log in
                            </Link>
                        </div>
                    </>
                )}
            </Form>
        </GuestLayout>
    );
}
