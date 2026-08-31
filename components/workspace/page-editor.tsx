'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Workspace } from '@/lib/prisma-client';
import type { EditablePage, SafeMember } from '@/lib/types';
import { CollaborativeEditor } from '@/components/editor/collaborative-editor';
import { Button } from '@/components/ui/button';
import {
  Copy,
  Globe,
  ImagePlus,
  Link2,
  Lock,
  Maximize2,
  MailPlus,
  Share2,
  Smile,
  Users,
  Users as WorkspaceIcon,
} from 'lucide-react';
import { EmojiPicker } from '@/components/ui/emoji-picker';
import { CoverPicker, coverBackground } from '@/components/workspace/cover-picker';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';

interface PageEditorProps {
  workspace: Workspace;
  page: EditablePage;
  members: SafeMember[];
  currentUser: any;
  /**
   * 'peek' renders the same editor inside the side panel: no reading-position
   * rail, a shorter cover, and an "Open full page" action in place of the crumb.
   */
  variant?: 'full' | 'peek';
  onOpenFullPage?: () => void;
}

/** Debounce before the title is persisted. */
const TITLE_SAVE_DEBOUNCE_MS = 700;

export function PageEditor({
  workspace,
  page,
  members,
  currentUser,
  variant = 'full',
  onOpenFullPage,
}: PageEditorProps) {
  const isPeek = variant === 'peek';
  const router = useRouter();
  const [title, setTitle] = useState(page.title);
  const [icon, setIcon] = useState<string | null>(page.icon ?? '📄');
  const [cover, setCover] = useState<string | null>(page.coverImage ?? null);
  const [isSaving, setIsSaving] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [shareType, setShareType] = useState(page.shareType || 'private');
  const [scrollProgress, setScrollProgress] = useState(0);
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(isNaN(progress) ? 0 : Math.max(0, Math.min(100, progress)));
  };

  /** Single writer for every page-level attribute save. */
  const savePage = useCallback(
    async (data: Record<string, unknown>, errorMessage: string) => {
      setIsSaving(true);
      try {
        const response = await fetch(`/api/pages/${page.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, source: 'editor' }),
        });
        if (!response.ok) throw new Error();
        router.refresh();
      } catch {
        toast.error(errorMessage);
      } finally {
        setIsSaving(false);
      }
    },
    [page.id, router]
  );

  const handleIconChange = (newIcon: string) => {
    setIcon(newIcon);
    void savePage({ icon: newIcon }, 'Could not save the page icon');
  };

  const handleIconRemove = () => {
    setIcon(null);
    void savePage({ icon: null }, 'Could not remove the page icon');
  };

  const handleCoverChange = (newCover: string | null) => {
    setCover(newCover);
    void savePage({ coverImage: newCover }, 'Could not update the cover');
  };

  // The HTML mirror on `Page.content` is what search, public shares and MCP read,
  // so it is saved alongside the collaborative document.
  const handleContentChange = useCallback(
    async (content: string) => {
      try {
        await fetch(`/api/pages/${page.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, source: 'editor' }),
        });
      } catch {
        toast.error('Could not save this page');
      }
    },
    [page.id]
  );

  useEffect(() => {
    if (title === page.title) return;
    const timeoutId = setTimeout(() => {
      void savePage({ title }, 'Could not save the title');
    }, TITLE_SAVE_DEBOUNCE_MS);
    return () => clearTimeout(timeoutId);
  }, [title, page.title, savePage]);

  // Grow the title box with its content instead of scrolling inside it.
  useEffect(() => {
    const node = titleRef.current;
    if (!node) return;
    node.style.height = 'auto';
    node.style.height = `${node.scrollHeight}px`;
  }, [title]);

  const copyPageLink = async () => {
    const url = `${window.location.origin}/workspaces/${workspace.id}/pages/${page.id}`;
    await navigator.clipboard.writeText(url);
    setShareMessage('Page link copied');
    toast.success('Page link copied');
    setTimeout(() => setShareMessage(''), 1600);
  };

  const handleSendInvite = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, workspaceId: workspace.id }),
      });

      if (response.ok) {
        setInviteEmail('');
        setShowInvite(false);
        toast.success(`Invite sent to ${inviteEmail}`);
      } else {
        const data = await response.json().catch(() => ({}));
        toast.error(data.message || 'Could not send that invite');
      }
    } catch {
      toast.error('Could not send that invite');
    }
  };

  const handleShareTypeChange = async (newShareType: string) => {
    setShareType(newShareType);
    try {
      const response = await fetch(`/api/pages/${page.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shareType: newShareType }),
      });

      if (response.ok) {
        setShareMessage(`Sharing updated to ${newShareType}`);
        toast.success(`Sharing set to ${newShareType}`);
        setTimeout(() => setShareMessage(''), 2000);
        router.refresh();
      } else {
        toast.error('Could not update sharing');
      }
    } catch {
      toast.error('Could not update sharing');
    }
  };

  const getPublicShareUrl = () =>
    page.shareToken ? `${window.location.origin}/share/${page.shareToken}` : '';

  const isOwner = workspace.ownerId === currentUser.id;

  const TOTAL_SEGMENTS = 14;
  const activeSegment = Math.min(
    Math.floor((scrollProgress / 100) * TOTAL_SEGMENTS),
    TOTAL_SEGMENTS - 1
  );

  return (
    <div className="flex h-full flex-col bg-[#191919] text-[#f1f1ef]">
      {/* Compact bar: always shows where you are and how to share. */}
      <div className="sticky top-0 z-20 border-b border-[#2f2f2f] bg-[#191919]/90 px-4 py-2.5 backdrop-blur sm:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            {isPeek && onOpenFullPage && (
              <button
                type="button"
                onClick={onOpenFullPage}
                title="Open as full page"
                className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[#9b9b9b] transition-colors hover:bg-[#2f2f2f] hover:text-white"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Open full page</span>
              </button>
            )}
            {icon && <span className="text-base leading-none">{icon}</span>}
            <span className="truncate text-sm font-medium text-[#d4d4d4]">
              {title || 'Untitled'}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden -space-x-2 sm:flex">
              {members.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className="grid h-7 w-7 place-items-center rounded-md border-2 border-[#191919] bg-[#333333] text-xs font-semibold text-[#f1f1ef]"
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
                    className="h-8 gap-2 rounded-md text-[#d4d4d4] transition-colors hover:bg-[#2f2f2f] hover:text-white"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-72 rounded-lg border-[#3f3f3f] bg-[#252525] p-1 text-[#f1f1ef] shadow-xl"
                >
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share page
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#3a3a3a]" />
                  <DropdownMenuRadioGroup value={shareType} onValueChange={handleShareTypeChange}>
                    <DropdownMenuRadioItem
                      value="private"
                      className="gap-2 rounded-md focus:bg-[#333333] focus:text-white"
                    >
                      <Lock className="h-4 w-4" />
                      <div className="flex-1">
                        <div className="font-medium">Private</div>
                        <div className="text-xs text-[#858585]">Only you can view and edit</div>
                      </div>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="workspace"
                      className="gap-2 rounded-md focus:bg-[#333333] focus:text-white"
                    >
                      <WorkspaceIcon className="h-4 w-4" />
                      <div className="flex-1">
                        <div className="font-medium">Workspace</div>
                        <div className="text-xs text-[#858585]">Members can view and edit</div>
                      </div>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="global"
                      className="gap-2 rounded-md focus:bg-[#333333] focus:text-white"
                    >
                      <Globe className="h-4 w-4" />
                      <div className="flex-1">
                        <div className="font-medium">Public</div>
                        <div className="text-xs text-[#858585]">Anyone with the link can read</div>
                      </div>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>

                  <DropdownMenuSeparator className="bg-[#3a3a3a]" />
                  <DropdownMenuItem
                    className="gap-2 rounded-md focus:bg-[#333333] focus:text-white"
                    onClick={copyPageLink}
                  >
                    <Link2 className="h-4 w-4" />
                    Copy page link
                  </DropdownMenuItem>

                  {shareType === 'global' && getPublicShareUrl() && (
                    <DropdownMenuItem
                      className="gap-2 rounded-md focus:bg-[#333333] focus:text-white"
                      onClick={() => {
                        navigator.clipboard.writeText(getPublicShareUrl());
                        toast.success('Public link copied');
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      Copy public link
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator className="bg-[#3a3a3a]" />
                  <DropdownMenuLabel className="flex items-center gap-2 text-xs text-[#9b9b9b]">
                    <MailPlus className="h-3.5 w-3.5" />
                    Invite to workspace
                  </DropdownMenuLabel>
                  <div className="p-3 pt-1">
                    <form onSubmit={handleSendInvite} className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Enter email"
                        value={inviteEmail}
                        onChange={(event) => setInviteEmail(event.target.value)}
                        className="min-w-0 flex-1 rounded-md border border-[#3f3f3f] bg-[#1f1f1f] px-2 py-1 text-sm text-[#f1f1ef] outline-none transition-colors focus:border-[#666666]"
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
                  {shareMessage && (
                    <p className="px-2 pb-1 text-xs text-[#b8b8b8]">{shareMessage}</p>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto" onScroll={handleScroll}>
        {/* Reading position, mirroring the editor's scroll. */}
        <div
          className={`fixed right-6 top-1/2 z-10 -translate-y-1/2 flex-col gap-[6px] ${
            isPeek ? 'hidden' : 'hidden sm:flex'
          }`}
        >
          {Array.from({ length: TOTAL_SEGMENTS }).map((_, index) => (
            <div
              key={index}
              className={`h-[2px] w-4 rounded-full transition-colors duration-300 ${
                index <= activeSegment ? 'bg-[#f1f1ef]' : 'bg-[#3f3f3f]'
              }`}
            />
          ))}
        </div>

        {/* Cover banner */}
        {cover && (
          <div className={`group/cover relative w-full ${isPeek ? 'h-28 sm:h-36' : 'h-40 sm:h-56'}`}>
            <div className="absolute inset-0" style={{ background: coverBackground(cover) }} />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#191919] to-transparent" />
            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 transition-opacity duration-200 group-hover/cover:opacity-100 focus-within:opacity-100">
              <CoverPicker value={cover} onChange={handleCoverChange}>
                <button
                  type="button"
                  className="rounded-md bg-[#191919]/85 px-2.5 py-1 text-xs text-[#e8e8e6] backdrop-blur transition-colors hover:bg-[#191919]"
                >
                  Change cover
                </button>
              </CoverPicker>
              <button
                type="button"
                onClick={() => handleCoverChange(null)}
                className="rounded-md bg-[#191919]/85 px-2.5 py-1 text-xs text-[#e8e8e6] backdrop-blur transition-colors hover:bg-[#191919]"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <div className={`mx-auto max-w-3xl px-4 pb-24 ${isPeek ? 'sm:px-6' : 'sm:px-8'}`}>
          <div className="group/header">
          {/* Icon: overlaps the cover the way Notion's does. */}
          <div className={`relative z-10 ${cover ? '-mt-12 sm:-mt-14' : 'pt-8 sm:pt-10'}`}>
            {icon && (
              <EmojiPicker value={icon} onChange={handleIconChange} onRemove={handleIconRemove}>
                <button
                  type="button"
                  aria-label="Change page icon"
                  className="grid h-[72px] w-[72px] place-items-center rounded-lg text-[60px] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-colors hover:bg-[#2a2a2a] sm:h-20 sm:w-20 sm:text-[68px]"
                >
                  {icon}
                </button>
              </EmojiPicker>
            )}
          </div>

          {/* Controls appear on hover, so a clean page stays clean. */}
          <div className="mt-1 flex h-8 items-center gap-1 opacity-0 transition-opacity duration-200 focus-within:opacity-100 group-hover/header:opacity-100">
            {!icon && (
              <EmojiPicker value="📄" onChange={handleIconChange}>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[#9b9b9b] transition-colors hover:bg-[#2a2a2a] hover:text-[#e8e8e6]"
                >
                  <Smile className="h-3.5 w-3.5" />
                  Add icon
                </button>
              </EmojiPicker>
            )}
            {!cover && (
              <CoverPicker value={cover} onChange={handleCoverChange} align="start">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[#9b9b9b] transition-colors hover:bg-[#2a2a2a] hover:text-[#e8e8e6]"
                >
                  <ImagePlus className="h-3.5 w-3.5" />
                  Add cover
                </button>
              </CoverPicker>
            )}
          </div>

          <textarea
            ref={titleRef}
            value={title}
            onChange={(event) => setTitle(event.target.value.replace(/\n/g, ''))}
            onKeyDown={(event) => {
              // Enter moves into the body rather than adding a line to the title.
              if (event.key === 'Enter') event.preventDefault();
            }}
            rows={1}
            placeholder="Untitled"
            aria-label="Page title"
            className="mt-1 w-full resize-none overflow-hidden bg-transparent text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#f1f1ef] outline-none placeholder:text-[#454545] sm:text-[40px]"
          />
          </div>

          <div className="mb-8 mt-2 flex items-center justify-between gap-3 text-xs text-[#7a7a7a]">
            <p className="min-w-0 truncate">
              {members.length} member{members.length !== 1 ? 's' : ''} · Created by{' '}
              {page.createdBy?.name || 'a removed user'} · Updated{' '}
              {new Date(page.updatedAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <span
              aria-live="polite"
              className={`shrink-0 transition-opacity duration-200 ${
                isSaving ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Saving…
            </span>
          </div>

          <CollaborativeEditor
            pageId={page.id}
            initialContent={page.content || ''}
            initialVersion={page.version}
            onContentChange={handleContentChange}
          />
        </div>
      </div>
    </div>
  );
}
