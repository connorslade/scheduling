import { redirect_url } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export function GET() {
  redirect(307, redirect_url());
}
