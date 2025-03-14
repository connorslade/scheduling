export function format_date_range(
  start: Date | null,
  end: Date | null,
  time: boolean = false,
): string | null {
  if (start === null && end === null) return null;

  const format = (date: Date, time: boolean) =>
    date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) +
    (time
      ? " " + date.toLocaleTimeString(undefined, { timeStyle: "short" })
      : "");

  const start_date = start !== null ? format(start, time) : null;
  const end_date = end !== null ? format(end, time) : null;

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

export function datetime_string(date: Date | null): string | null {
  if (date === null) return null;
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .split(".")[0];
}

export function parse_date(raw: string | undefined) {
  if (raw === undefined) return null;
  let date = new Date(raw);
  if (isNaN(date.getTime())) return null;
  return date;
}
