import type { PageServerLoad } from "./$types";
import type { Event } from "@prisma/client";
import { error } from "@sveltejs/kit";
import database from "$lib/server/database";

export const load: PageServerLoad = async ({ params }) => {
  let session = await database.eventSession.findFirst({
    where: {
      slug: params.session,
      event: {
        slug: params.event,
      },
    },
    include: { event: true },
  });

  if (session === null) error(404, "Session not found.");
  return { event: session.event, session };
};
