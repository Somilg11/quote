'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { AuthShell, authButtonClass, authInputClass, authLabelClass } from '@/components/auth/auth-shell';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to create account');
        return;
      }

      router.push('/auth/signin?message=Account created successfully');
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Start writing together."
      subtitle="Create your Quote account."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-zinc-100 underline-offset-4 hover:underline">
            Sign in
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
              Name
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={authInputClass}
            />
          </div>

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

          <div>
            <label className={authLabelClass}>
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={authInputClass}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={authButtonClass}
          >
            {isLoading ? <Spinner className="h-4 w-4" /> : "Sign up"}
          </Button>
        </form>
    </AuthShell>
  );
}
