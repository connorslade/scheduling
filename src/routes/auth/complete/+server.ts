import { error, redirect, type RequestHandler } from "@sveltejs/kit";

import database from "$lib/server/database";
import {
  complete,
  invalid_email,
  is_valid_state,
  MAX_AGE,
} from "$lib/server/auth";
import type { UserInfo } from "$lib/types";
import { create_session } from "$lib/server/session";

export const GET: RequestHandler = async ({ url, cookies }) => {
  const params = url.searchParams;
  let code = params.get("code");
  let state = params.get("state");

  if (code === null || state === null)
    return error(400, "Missing code or state.");
  if (!is_valid_state(state)) return error(400, "Invalid state.");

  const user: UserInfo = await complete(code);
  if (invalid_email(user)) return error(403, "Invalid email domain.");

  await database.user.upsert({
    where: {
      id: user.id,
    },
    create: user,
    update: user,
  });

  let session = await create_session(user);
  cookies.set("session", session, { path: "/", maxAge: MAX_AGE });

  redirect(307, "/");
};
