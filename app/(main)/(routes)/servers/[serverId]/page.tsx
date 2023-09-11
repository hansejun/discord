import { db } from "@/lib/db";
import { currentProfile } from "@/lib/modelUtils/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface PropsType {
  params: {
    serverId: string;
  };
}

const ServerIdPage = async ({ params }: PropsType) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") return null;

  return redirect(`/servers/${params.serverId}/channels/${initialChannel.id}`);
};

export default ServerIdPage;
