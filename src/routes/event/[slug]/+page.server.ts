import type { PageServerLoad } from "./$types";
import type { Event } from "@prisma/client";
import { error } from "@sveltejs/kit";
import database from "$lib/server/database";

export const load: PageServerLoad = async ({ params }) => {
  let event: Event | null = await database.event.findFirst({
    where: {
      slug: params.slug,
    },
  });

  if (event === null) error(404, "Event not found.");
  return { event };
};
