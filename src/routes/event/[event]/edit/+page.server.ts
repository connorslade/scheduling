import type { Actions, PageServerLoad } from "./$types";
import type { Event } from "@prisma/client";
import { error, redirect } from "@sveltejs/kit";
import database from "$lib/server/database";
import { parse_date } from "$lib/util/date";

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

    redirect(303, `/event/${overview.slug}`);
  },
} satisfies Actions;
