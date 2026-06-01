'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewWorkspacePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    // Auto-generate slug from name
    setSlug(value.toLowerCase().replace(/\s+/g, '-').slice(0, 50));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Workspace name is required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim() || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to create workspace');
        return;
      }

      const { workspace } = await response.json();
      router.push(`/workspaces/${workspace.id}`);
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#191919] text-[#f1f1ef]">
      <div className="max-w-md mx-auto px-4 py-12">
        <Link
          href="/workspaces"
          className="inline-flex items-center text-sm text-[#b8b8b8] hover:text-white mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Workspaces
        </Link>

        <h1 className="text-3xl font-semibold text-[#f1f1ef] mb-2">Create Workspace</h1>
        <p className="text-[#b8b8b8] mb-8">
          Start a new collaborative workspace
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md text-sm text-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#d4d4d4] mb-1">
              Workspace Name
            </label>
            <Input
              type="text"
              placeholder="My Project"
              value={name}
              onChange={handleNameChange}
              required
              className="border-[#3f3f3f] bg-[#202020] text-[#f1f1ef]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#d4d4d4] mb-1">
              Workspace URL
            </label>
            <div className="flex items-center">
              <span className="text-sm text-[#858585]">workspace.com/</span>
              <Input
                type="text"
                placeholder="my-project"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="border-[#3f3f3f] bg-[#202020] text-[#f1f1ef] ml-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#d4d4d4] mb-1">
              Description (Optional)
            </label>
            <textarea
              placeholder="What is this workspace for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-[#3f3f3f] bg-[#202020] text-[#f1f1ef] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#666666]"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#f1f1ef] text-[#202020] hover:bg-white"
          >
            {isLoading ? 'Creating...' : 'Create Workspace'}
          </Button>
        </form>
      </div>
    </div>
  );
}
