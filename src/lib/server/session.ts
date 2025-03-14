import type { UserInfo } from "$lib/types";
import database from "$lib/server/database";
import { random_string } from "$lib/util/misc";

export async function create_session(user: UserInfo): Promise<string> {
  let session_id = random_string(16);

  await database.session.create({
    data: {
      id: session_id,
      user_id: user.id,
    },
  });

  return session_id;
}

export async function get_session(
  session_id: string | undefined,
): Promise<UserInfo | null> {
  if (session_id === undefined) return null;

  let session = await database.session.findUnique({
    where: {
      id: session_id,
    },
    include: {
      user: true,
    },
  });

  return session?.user || null;
}
