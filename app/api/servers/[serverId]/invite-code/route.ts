import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { currentProfile } from '@/lib/modelUtils/current-profile';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse('Unauthorized', { status: 401 });
    if (!params.serverId)
      return new NextResponse('Server ID Missing', { status: 400 });

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
    return NextResponse.json(server);
  } catch (e) {
    console.log('[SERVER_ID]', e);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
