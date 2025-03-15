import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import database from "$lib/server/database";
import { is_admin } from "$lib/server/auth";

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
  delete: async ({ params, locals }) => {
    if (!is_admin(params.event, locals.user.id)) error(403, "Unauthorized.");

    await database.eventSession.deleteMany({
      where: {
        slug: params.session,
        event: {
          slug: params.event,
        },
      },
    });

    redirect(307, `/event/${params.event}`);
  },
} satisfies Actions;
