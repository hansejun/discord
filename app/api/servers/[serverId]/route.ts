import { db } from '@/lib/db';
import { currentProfile } from '@/lib/modelUtils/current-profile';
import { NextResponse } from 'next/server';

type PatchBody = {
  name: string;
  imageUrl: string;
};

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl: imageURl }: PatchBody = await req.json();

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageURl,
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log('[SERVER_ID_ERROR]', e);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
