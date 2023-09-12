import { Hash, User } from "lucide-react";
import { MobileToggle } from "../common/mobile-toggle";
import UserAvatar from "@/components/common/user-avatar";

interface PropsType {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({ serverId, name, type, imageUrl }: PropsType) => {
  return (
    <div className="text-md b-2 flex h-12 items-center border border-neutral-200 px-3 font-semibold dark:border-neutral-800">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="mr-2 h-8 w-8 md:h-8 md:w-8 " />
      )}
      <p className="text-md font-semibold text-black dark:text-white">{name}</p>
    </div>
  );
};

export default ChatHeader;
