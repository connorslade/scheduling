import type { Actions, PageServerLoad } from "./$types";
import type { Event, EventSession, Session } from "@prisma/client";
import { error } from "@sveltejs/kit";
import database from "$lib/server/database";
import { parse_csv } from "$lib/util";

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

export const actions = {
  upload: async ({ request, params }) => {
    let event = await database.event.findFirst({
      where: {
        slug: params.event,
      },
    });
    if (event == null) error(404, "Event not found.");

    let form = await request.formData();
    let file = form.get("file") as File;
    let csv = parse_csv(await file.text());

    let sessions: EventSession[] = [];
    for (let [name, slug, capacity, start, end, description] of csv) {
      sessions.push({
        id: crypto.randomUUID(),
        slug,
        name,
        description,
        event_id: event.id,
        capacity: capacity != "" ? parseInt(capacity) : null,
        start_time: new Date(start),
        end_time: new Date(end),
      });
    }

    await database.eventSession.createMany({
      data: sessions,
      skipDuplicates: true,
    });
  },
} satisfies Actions;
