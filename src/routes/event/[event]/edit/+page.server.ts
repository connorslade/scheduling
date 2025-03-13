import type { Actions, PageServerLoad } from "./$types";
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

export const actions = {
  default: async ({ request }) => {
    let form = await request.formData();

    let overview = {
      id: form.get("id")?.toString(),
      title: form.get("title")?.toString(),
      slug: form.get("slug")?.toString(),
      brief: form.get("brief")?.toString(),
      description: form.get("description")?.toString(),
      start_time: form.get("start-time")?.toString(),
      end_time: form.get("end-time")?.toString(),
    };

    if (Object.values(overview).some((value) => value === undefined))
      error(400);

    await database.event.update({
      where: {
        id: overview.id,
      },
      data: {
        name: overview.title,
        slug: overview.slug,
        brief: overview.brief,
        description: overview.description,
        start_date: parse_date(overview.start_time),
        end_date: parse_date(overview.end_time),
      },
    });

    let sessions = [];
    for (let key of form.keys()) {
      if (key.startsWith("session-") && key.endsWith("-title"))
        sessions.push(key.split("-").slice(1, -1).join("-"));
    }

    for (let session_id of sessions) {
      let session = {
        title: form.get(`session-${session_id}-title`)?.toString(),
        slug: form.get(`session-${session_id}-slug`)?.toString(),
        description: form.get(`session-${session_id}-description`)?.toString(),
        start_time: form.get(`session-${session_id}-start_time`)?.toString(),
        end_time: form.get(`session-${session_id}-end_time`)?.toString(),
        capacity: form.get(`session-${session_id}-capacity`)?.toString(),
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

      let data = {
        name: session.title,
        slug: session.slug,
        description: session.description,
        start_time,
        end_time,
        capacity,
        id: session_id,
        event_id: overview.id,
      };
      await database.eventSession.upsert({
        where: {
          id: session_id,
        },
        create: data,
        update: data,
      });
    }

    redirect(303, `/event/${overview.slug}`);
  },
} satisfies Actions;

function parse_date(raw: string | undefined) {
  if (raw === undefined) return null;
  let date = new Date(raw);
  if (isNaN(date.getTime())) return null;
  return date;
}
