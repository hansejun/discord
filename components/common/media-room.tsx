"use client";
import "@livekit/components-styles";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface MediaRoom {
  chatId: string;
  video: boolean;
  audio: boolean;
}

const MediaRoom = ({ chatId, video, audio }: MediaRoom) => {
  const { user } = useUser();
  const [token, setToken] = useState("");

  const init = useCallback(
    async (name: string) => {
      try {
        const response = await fetch(
          `/api/livekit?room=${chatId}&username=${name}`,
        ).then((res) => res.json());
        console.log(response);
        setToken(response.token);
      } catch (e) {
        console.log("At MediaRoom", e);
      }
    },
    [chatId],
  );

  useEffect(() => {
    const hasName = user?.firstName && user?.lastName;

    if (hasName) {
      const name = `${user?.firstName} ${user?.lastName}`;
      init(name);
    }
  }, [user, init]);

  if (token === "") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};

export default MediaRoom;
