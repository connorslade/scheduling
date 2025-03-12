import type { Handle } from "@sveltejs/kit";
import { get_session } from "$lib/server/session";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = await get_session(event.cookies.get("session"));
  return await resolve(event);
};
