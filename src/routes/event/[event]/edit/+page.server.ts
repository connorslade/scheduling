import type { Actions, PageServerLoad } from "./$types";
import { error, fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import database from "$lib/server/database";
import { parse_date } from "$lib/util/date";

const schema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  brief: z.string(),
  description: z.string(),
  start_date: z.string().date().transform(parse_date).optional(),
  end_date: z.string().date().transform(parse_date).optional(),
});

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

  return { event, sessions: event.sessions };
};

export const actions = {
  default: async ({ request }) => {
    const form = Object.fromEntries(await request.formData());
    const data = schema.safeParse(form);
    if (!data.success) error(400, "Invalid data");

    await database.event.update({
      where: {
        id: data.data.id,
      },
      data: data.data,
    });

    redirect(303, `/event/${data.data.slug}`);
  },
} satisfies Actions;
