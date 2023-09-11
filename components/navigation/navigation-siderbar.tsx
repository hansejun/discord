import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/common/mode-toggle";

import NavigationAction from "./navigation-action";
import NavigationItem from "./navigation-item";
import { currentProfile } from "@/lib/modelUtils/current-profile";

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 bg-[#E3E5E8] py-3 text-primary dark:bg-[#1E1F22]">
      <NavigationAction />
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageURl={server.imageURl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ModeToggle />
        <div className="rounded-full transition-all hover:ring-2 hover:ring-emerald-500">
          <UserButton
            afterSignOutUrl="/"
            appearance={{ elements: { avatarBox: "h-[48px] w-[48px]" } }}
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;
