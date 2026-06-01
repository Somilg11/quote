'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewPagePage() {
  const router = useRouter();
  const params = useParams();
  const workspaceId = params.id as string;

  const [title, setTitle] = useState('Untitled');
  const [icon, setIcon] = useState('📄');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const icons = ['📄', '📝', '📖', '📚', '🎯', '🔖', '📋', '📊', '💡', '🗂️'];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Page title is required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/workspaces/${workspaceId}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          icon,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to create page');
        return;
      }

      const { page } = await response.json();
      router.push(`/workspaces/${workspaceId}/pages/${page.id}`);
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 text-[#f1f1ef]">
      <Link
        href={`/workspaces/${workspaceId}`}
        className="inline-flex items-center text-sm text-[#b8b8b8] hover:text-white mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Workspace
      </Link>

      <div className="max-w-md">
        <h1 className="text-3xl font-semibold text-[#f1f1ef] mb-2">Create Page</h1>
        <p className="text-[#b8b8b8] mb-8">Create a new collaborative page</p>

        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md text-sm text-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#d4d4d4] mb-1">
              Page Title
            </label>
            <Input
              type="text"
              placeholder="Untitled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-[#3f3f3f] bg-[#202020] text-[#f1f1ef]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#d4d4d4] mb-2">
              Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {icons.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIcon(i)}
                  className={`p-2 text-2xl rounded border-2 transition-all ${
                    icon === i
                      ? 'border-[#f1f1ef] bg-[#333333]'
                      : 'border-[#3f3f3f] hover:border-[#666666]'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#f1f1ef] text-[#202020] hover:bg-white"
          >
            {isLoading ? 'Creating...' : 'Create Page'}
          </Button>
        </form>
      </div>
    </div>
  );
}
