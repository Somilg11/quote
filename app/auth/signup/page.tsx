'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import bcrypt from 'bcryptjs';
import { Spinner } from '@/components/ui/spinner';
import { ArrowRight, Quote } from 'lucide-react';

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
      const hashedPassword = await bcrypt.hash(password, 10);

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password: hashedPassword,
        }),
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
    <div className="min-h-screen bg-[#191919] px-4 py-6 text-[#f1f1ef] sm:px-6">
      <Link href="/" className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold transition-colors hover:bg-[#2f2f2f]">
        <Quote className="h-4 w-4" />
        Quote
      </Link>
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-sm items-center">
        <div className="w-full rounded-md border border-[#2f2f2f] bg-[#202020] p-5 shadow-2xl sm:p-6">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-semibold tracking-tight">Create account</h1>
            <p className="text-sm leading-6 text-[#b8b8b8]">
              Join Quote to write together in real time.
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
              Name
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-[#3f3f3f] bg-[#191919] text-[#f1f1ef] placeholder:text-[#858585]"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-[#d4d4d4] mb-1">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border-[#3f3f3f] bg-[#191919] text-[#f1f1ef] placeholder:text-[#858585]"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#f1f1ef] text-[#202020] hover:bg-white"
          >
            {isLoading ? <Spinner className="h-4 w-4" /> : <>Sign up <ArrowRight className="h-4 w-4" /></>}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-[#b8b8b8]">
          Already have an account?{' '}
          <Link href="/auth/signin" className="font-semibold text-[#f1f1ef] hover:underline">
            Sign in
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
