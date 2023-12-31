import { Channel, ChannelType, Server } from "@prisma/client";
import { atom, useRecoilState } from "recoil";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage";

interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface Modal {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
}

const modalAtom = atom<Modal>({
  key: "modal",
  default: { type: null, isOpen: false, data: {} },
});

export const useModal = () => {
  const [{ type, isOpen, data }, setValue] = useRecoilState(modalAtom);

  const onOpen = (type: ModalType, data = {}) => {
    setValue({ isOpen: true, type, data });
  };

  const onClose = () => {
    setValue({ isOpen: false, type: null, data: {} });
  };

  return { type, isOpen, onOpen, onClose, data };
};
