import type { PageServerLoad } from "./$types";
import type { Event } from "@prisma/client";
import database from "$lib/server/database";

export const load: PageServerLoad = async () => {
  let events: Event[] = await database.event.findMany();
  return { events };
};
