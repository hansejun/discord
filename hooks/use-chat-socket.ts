import { useSocket } from "@/components/providers/socket-provider";
import { Member, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface PropsType {
  addKey: string; // 메시지 전송 key
  updateKey: string; // 메시지 수정 key
  queryKey: string; // 리액트 쿼리 key
}

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

export const useChatSocket = ({ addKey, updateKey, queryKey }: PropsType) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (socket) {
      // 수정 이벤트를 전달 받을 경우
      socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
        queryClient.setQueryData([queryKey], (oldData: any) => {
          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return oldData;
          }

          const newData = oldData.pages.map((page: any) => {
            return {
              ...page,
              items: page.items.map((item: MessageWithMemberWithProfile) => {
                if (item.id === message.id) return message;
                return item;
              }),
            };
          });

          return { ...oldData, pages: newData };
        });
      });

      // 추가 이벤트를 전달 받을 경우
      socket.on(addKey, (message: MessageWithMemberWithProfile) => {
        console.log("message", message);
        queryClient.setQueryData([queryKey], (oldData: any) => {
          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return { pages: [{ items: [message] }] };
          }

          const newData = [...oldData.pages];

          newData[0] = {
            ...newData[0],
            items: [message, ...newData[0].items],
          };

          return { ...oldData, pages: newData };
        });
      });
    }

    return () => {
      socket?.off(addKey);
      socket?.off(updateKey);
    };
  }, [queryClient, addKey, queryKey, socket, updateKey]);
};
