import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import database from "$lib/server/database";
import { parse_date } from "$lib/util/date";

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

export const actions = {
  default: async ({ request }) => {
    let form = await request.formData();

    let session = {
      id: form.get("id")?.toString(),
      title: form.get(`title`)?.toString(),
      slug: form.get(`slug`)?.toString(),
      description: form.get(`description`)?.toString(),
      start_time: form.get(`start-time`)?.toString(),
      end_time: form.get(`end-time`)?.toString(),
      capacity: form.get(`capacity`)?.toString(),
    };

    if (
      Object.values(session).some((value) => value === undefined) ||
      session.title === undefined ||
      session.slug === undefined ||
      session.description === undefined
    )
      error(400, "Not all session fields are filled out.");

    let start_time = parse_date(session.start_time);
    let end_time = parse_date(session.end_time);
    if (start_time === null || end_time === null)
      error(400, "Invalid start/end time");

    let capacity = parseInt(session.capacity ?? "");

    await database.eventSession.update({
      where: {
        id: session.id,
      },
      data: {
        name: session.title,
        slug: session.slug,
        description: session.description,
        start_time,
        end_time,
        capacity,
      },
    });

    let event_session = await database.eventSession.findUnique({
      where: { id: session.id },
      include: { event: true },
    });

    redirect(303, `/event/${event_session?.event.slug}/${session.slug}`);
  },
} satisfies Actions;
