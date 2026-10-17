'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { AuthShell, authButtonClass, authInputClass, authLabelClass } from '@/components/auth/auth-shell';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/workspaces';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else if (result?.ok) {
        router.replace(result.url || callbackUrl);
        router.refresh();
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back."
      subtitle="Sign in to pick up where you left off."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-zinc-100 underline-offset-4 hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-[#6f302d] bg-[#3a2928] p-3 text-[13px] text-[#ffb4ae]">
              {error}
            </div>
          )}

          <div>
            <label className={authLabelClass}>
              Email
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={authInputClass}
            />
          </div>

          <div>
            <label className={authLabelClass}>
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={authInputClass}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={authButtonClass}
          >
            {isLoading ? <Spinner className="h-4 w-4" /> : "Sign in"}
          </Button>
        </form>
    </AuthShell>
  );
}
