import { Member, Profile, Server } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { Server as ServerIO } from "socket.io";
import { NextApiResponse } from "next";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type NextApiRequestWithIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};
