import {
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  EXTERNAL_URL,
  REQUIRED_EMAIL_PREFIX,
} from "$env/static/private";

import { randomString } from "../util";

const MAX_AGE = 1000 * 60;
let oauthState: { [key: string]: number } = {};

export type UserInfo = {
  id: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

export function redirect_url() {
  const state = randomString(16);
  const epoch = Date.now();
  oauthState[state] = epoch;

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${AUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(EXTERNAL_URL)}/auth/complete&response_type=code&scope=profile email&state=${state}`;
  return url;
}

export function is_valid_state(state: string): boolean {
  if (!(state in oauthState)) return false;
  let valid = Date.now() - oauthState[state] <= MAX_AGE;
  delete oauthState[state];
  return valid;
}

export async function complete(code: string): Promise<UserInfo> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_secret: AUTH_CLIENT_SECRET,
      client_id: AUTH_CLIENT_ID,
      redirect_uri: `${EXTERNAL_URL}/auth/complete`,
      code,
    }),
  });

  const resp = await response.json();
  const access_token = resp["access_token"];

  const userInfoResponse = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  return await userInfoResponse.json();
}

export function invalid_email(user: UserInfo): boolean {
  return (
    REQUIRED_EMAIL_PREFIX !== "" && !user.email.endsWith(REQUIRED_EMAIL_PREFIX)
  );
}
