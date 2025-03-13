import type { PageServerLoad } from "./$types";
import type { Event } from "@prisma/client";
import { error, redirect } from "@sveltejs/kit";
import database from "$lib/server/database";

export const load: PageServerLoad = async ({ params, locals }) => {
  let event = await database.event.findFirst({
    where: {
      slug: params.event,
    },
    include: {
      sessions: true,
    },
  });

  if (event === null) error(404, "Event not found.");
  if (!event.admin_user_id.includes(locals.user.id))
    redirect(307, `/event/${event.slug}`);

  return { event: event as Event, sessions: event.sessions };
};
