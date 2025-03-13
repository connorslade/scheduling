import type { PageServerLoad } from "./$types";
import type { Event } from "@prisma/client";
import { error } from "@sveltejs/kit";
import database from "$lib/server/database";

export const load: PageServerLoad = async ({ params }) => {
  let event = await database.event.findFirst({
    where: {
      slug: params.event,
    },
    include: {
      sessions: true,
    },
  });

  if (event === null) error(404, "Event not found.");
  return { event: event as Event, sessions: event.sessions };
};
