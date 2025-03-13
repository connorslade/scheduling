import type { Actions, PageServerLoad } from "./$types";
import type { Event } from "@prisma/client";
import { error, fail, redirect } from "@sveltejs/kit";
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

/*
FormData {
  title: 'Ridge Gives Back 2025',
  slug: 'ridge-gives-back-2025',
  brief: 'Ridge Gives Back is a day of service in which every student and staff member at Ridge High School spends the day engaged in service activities.',
  description: 'Ridge Gives Back is a day of service in which every student and staff member at Ridge High School spends the day engaged in service activities of their choice.  Activities will include trips to charitable associations in the communities surrounding the school, as well as the creation of materials in school that will then be shipped or delivered to nonprofit organizations (e.g., breakfast bags for local soup kitchens).  It is our hope that we can provide a chance for each individual to experience a day strictly for the sake of giving and examine how it makes them feel, what they need (and don’t need) in order to make a difference, and why they might incorporate more intentional altruism into their daily lives.',
  'start-time': '',
  'end-time': '',
  'session-9c2f3914-bb67-45ab-86ca-4b773f08e2d2-title': 'Round Valley Reservoir ',
  'session-9c2f3914-bb67-45ab-86ca-4b773f08e2d2-slug': 'round-valley',
  'session-9c2f3914-bb67-45ab-86ca-4b773f08e2d2-description': ' Volunteers will clean and maintain the reservoir and its surrounding areas; bring a lunch and a pair of work gloves if you have them!',
  'session-9c2f3914-bb67-45ab-86ca-4b773f08e2d2-start_time': '',
  'session-9c2f3914-bb67-45ab-86ca-4b773f08e2d2-end_time': '',
  'session-9c2f3914-bb67-45ab-86ca-4b773f08e2d2-capacity': ''
}
*/

export const actions = {
  default: async ({ request }) => {
    let form = await request.formData();
    console.log(form);

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

    if (overview.start_time === undefined || overview.end_time === undefined)
      error(400);

    const parse_date = (raw: string) => {
      let date = new Date(raw);
      if (isNaN(date.getTime())) return null;
      return date;
    };

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
