'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/brand/logo';

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
    <div className="min-h-screen bg-[#191919] px-4 py-6 text-[#f1f1ef] sm:px-6">
      <Link href="/" className="inline-flex rounded-md px-2 py-1 transition-opacity hover:opacity-80">
        <Logo />
      </Link>
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-sm items-center">
        <div className="w-full rounded-md border border-[#2f2f2f] bg-[#202020] p-5 shadow-2xl sm:p-6">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-semibold tracking-tight">Sign in</h1>
            <p className="text-sm leading-6 text-[#b8b8b8]">
              Welcome back to your collaborative workspace.
            </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md border border-[#6f302d] bg-[#3a2928] p-3 text-sm text-[#ffb4ae]">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#d4d4d4] mb-1">
              Email
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-[#3f3f3f] bg-[#191919] text-[#f1f1ef] placeholder:text-[#858585]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#d4d4d4] mb-1">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-[#3f3f3f] bg-[#191919] text-[#f1f1ef] placeholder:text-[#858585]"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#f1f1ef] text-[#202020] hover:bg-white"
          >
            {isLoading ? <Spinner className="h-4 w-4" /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-[#b8b8b8]">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="font-semibold text-[#f1f1ef] hover:underline">
            Sign up
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
