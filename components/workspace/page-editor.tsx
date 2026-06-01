'use client';

import { useState } from 'react';
import type { Workspace, Page, WorkspaceMember, User } from '@/lib/prisma-client';
import { CollaborativeEditor } from '@/components/editor/collaborative-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, MailPlus, Share2, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PageEditorProps {
  workspace: Workspace;
  page: Page & {
    createdBy: User | null;
  };
  members: (WorkspaceMember & {
    user: User;
  })[];
  currentUser: any;
}

export function PageEditor({
  workspace,
  page,
  members,
  currentUser,
}: PageEditorProps) {
  const [title, setTitle] = useState(page.title);
  const [isSaving, setIsSaving] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  const handleTitleChange = async (newTitle: string) => {
    setTitle(newTitle);
    setIsSaving(true);

    try {
      await fetch(`/api/pages/${page.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });
    } catch (error) {
      console.error('Failed to save title:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const copyPageLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setShareMessage('Page link copied');
    setTimeout(() => setShareMessage(''), 1600);
  };

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inviteEmail,
          workspaceId: workspace.id,
        }),
      });

      if (response.ok) {
        setInviteEmail('');
        setShowInvite(false);
        // Show success message
      }
    } catch (error) {
      console.error('Failed to send invite:', error);
    }
  };

  const isOwner = workspace.ownerId === currentUser.id;

  return (
    <div className="h-full flex flex-col bg-[#191919] text-[#f1f1ef]">
      <div className="sticky top-0 z-10 border-b border-[#2f2f2f] bg-[#191919]/90 px-4 py-3 backdrop-blur sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{page.icon}</span>
              <Input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="h-auto border-0 bg-transparent p-0 px-1 text-xl font-semibold text-[#f1f1ef] shadow-none transition-colors focus-visible:ring-0 focus:bg-[#2f2f2f]"
                placeholder="Untitled"
              />
            </div>
            <p className="mt-1 text-xs text-[#858585]">
              {members.length} member{members.length !== 1 ? 's' : ''} · Last edited by {page.createdBy?.name || 'Unknown'}
              {isSaving && ' · Saving...'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {members.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className="w-7 h-7 rounded-md bg-[#333333] border-2 border-[#191919] flex items-center justify-center text-xs font-semibold text-[#f1f1ef]"
                  title={member.user.name || 'Unknown'}
                >
                  {(member.user.name || 'U')[0].toUpperCase()}
                </div>
              ))}
            </div>

            {isOwner && (
              <DropdownMenu open={showInvite} onOpenChange={setShowInvite}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 rounded-md text-[#d4d4d4] transition-all duration-200 hover:bg-[#2f2f2f] hover:text-white"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 rounded-lg border-[#3f3f3f] bg-[#252525] p-1 text-[#f1f1ef] shadow-xl">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share page
                  </DropdownMenuLabel>
                  <DropdownMenuItem className="gap-2 rounded-md focus:bg-[#333333] focus:text-white" onClick={copyPageLink}>
                    <Copy className="h-4 w-4" />
                    Copy page link
                  </DropdownMenuItem>
                  {shareMessage && <p className="px-2 pb-1 text-xs text-[#b8b8b8]">{shareMessage}</p>}
                  <DropdownMenuSeparator className="bg-[#3a3a3a]" />
                  <DropdownMenuLabel className="flex items-center gap-2 text-xs text-[#9b9b9b]">
                    <MailPlus className="h-3.5 w-3.5" />
                    Invite to workspace
                  </DropdownMenuLabel>
                  
                  <div className="p-3 space-y-2">
                    <form onSubmit={handleSendInvite} className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Enter email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="flex-1 rounded-md border border-[#3f3f3f] bg-[#1f1f1f] px-2 py-1 text-sm text-[#f1f1ef] outline-none transition-colors focus:border-[#666666]"
                        required
                      />
                      <Button
                        type="submit"
                        size="sm"
                        className="rounded-md bg-[#f1f1ef] text-[#202020] hover:bg-white"
                      >
                        Send
                      </Button>
                    </form>
                  </div>

                  <DropdownMenuSeparator className="bg-[#3a3a3a]" />
                  <DropdownMenuLabel className="flex items-center gap-2 text-xs text-[#9b9b9b]">
                    <Users className="h-3.5 w-3.5" />
                    Members
                  </DropdownMenuLabel>
                  {members.map((member) => (
                    <DropdownMenuItem key={member.id} disabled className="rounded-md">
                      <div className="text-sm">
                        <div className="font-medium">{member.user.name}</div>
                        <div className="text-xs text-[#858585]">{member.user.email}</div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-3xl">
          <CollaborativeEditor
            initialContent={page.content || ''}
            pageId={page.id}
            onContentChange={async (content) => {
              // Debounced save would happen here
              try {
                await fetch(`/api/pages/${page.id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ content }),
                });
              } catch (error) {
                console.error('Failed to save content:', error);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
