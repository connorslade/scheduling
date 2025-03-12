import {
  complete,
  invalid_email,
  is_valid_state,
  type UserInfo,
} from "$lib/server/auth";
import { error, redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
  const params = url.searchParams;
  let code = params.get("code");
  let state = params.get("state");

  if (code === null || state === null)
    return error(400, "Missing code or state.");
  if (!is_valid_state(state)) return error(400, "Invalid state.");

  const user: UserInfo = await complete(code);
  if (invalid_email(user)) return error(403, "Invalid email domain.");

  redirect(307, "/");
};
