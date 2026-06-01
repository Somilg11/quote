"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react";

interface LiveblocksProviderWrapperProps {
  children: ReactNode;
}

export function LiveblocksProviderWrapper({
  children,
}: LiveblocksProviderWrapperProps) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        // This would typically fetch user info from your database
        return userIds.map((userId) => ({
          name: userId,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
        }));
      }}
    >
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
}

interface RoomProviderWrapperProps {
  roomId: string;
  children: ReactNode;
}

export function RoomProviderWrapper({
  roomId,
  children,
}: RoomProviderWrapperProps) {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={<div>Loading room...</div>}>
        {children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
