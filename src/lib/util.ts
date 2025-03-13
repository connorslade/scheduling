const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function random_string(length: number) {
  let result = "";

  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];

  return result;
}

export function kebab_case(str: string) {
  return str.toLowerCase().replace(/\s/g, "-");
}

export function format_date_range(
  start: Date | null,
  end: Date | null,
): string | null {
  if (start === null && end === null) return null;

  if (start !== null)
    start = new Date(start.getTime() + start.getTimezoneOffset() * 60000);
  if (end !== null)
    end = new Date(end.getTime() + end.getTimezoneOffset() * 60000);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const start_date = start?.toLocaleDateString(undefined, options) ?? null;
  const end_date = end?.toLocaleDateString(undefined, options) ?? null;

  if (start_date === end_date) return start_date;

  let out = "";
  if (start_date !== null) out += start_date;
  if (end_date !== null) out += ` to ${end_date}`;
  return out;
}

export function date_string(date: Date | null) {
  if (date === null) return null;
  return date.toISOString().split("T")[0];
}
