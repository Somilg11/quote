"use client";

import { useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [accepting, setAccepting] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    validateInvite();
  }, [token]);

  const validateInvite = async () => {
    try {
      const response = await fetch(`/api/invites?token=${token}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid invite");
        return;
      }

      setInvite(data.invite);
    } catch (err) {
      setError("Failed to validate invite");
    } finally {
      setLoading(false);
    }
  };

  const acceptInvite = async () => {
    setAccepting(true);
    try {
      const response = await fetch("/api/invites/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to accept invite");
        setAccepting(false);
        return;
      }

      // Redirect to workspace
      window.location.href = `/workspaces/${invite.workspaceId}`;
    } catch (err) {
      setError("Failed to accept invite");
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
          <CardHeader>
            <div className="flex items-center gap-2 text-red-400">
              <XCircle className="h-6 w-6" />
              <CardTitle className="text-white">Invalid Invite</CardTitle>
            </div>
            <CardDescription className="text-zinc-400">{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <CardTitle className="text-white">You're Invited!</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            You've been invited to join <strong className="text-white">{invite?.workspace?.name}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-zinc-400 space-y-1">
            <p>Invited to: <span className="text-white">{invite?.email}</span></p>
            <p>Expires: <span className="text-white">{new Date(invite?.expiresAt).toLocaleDateString()}</span></p>
          </div>
          <Button 
            onClick={acceptInvite} 
            disabled={accepting}
            className="w-full bg-white text-black hover:bg-zinc-200"
          >
            {accepting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Accepting...
              </>
            ) : (
              "Accept Invitation"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
