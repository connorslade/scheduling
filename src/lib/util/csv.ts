export function parse_csv(raw: string): string[][] {
  let rows: string[][] = [];
  let row = [];

  let i = 0;
  let in_quote = false;
  let working = "";

  const skip_whitespace = () => {
    while (++i < raw.length && raw[i] == " ") {}
    i--;
  };

  skip_whitespace();
  while (i < raw.length) {
    let chr = raw[i];

    if (in_quote) {
      if (chr == '"') {
        if (++i < raw.length && raw[i] == '"') working += '"';
        else {
          in_quote = false;
          row.push(working);
          working = "";
          i--;
        }
      } else working += chr;
    } else {
      if (chr == "\n") {
        row.push(working);
        rows.push(row);
        working = "";
        row = [];
      } else if (chr == ",") {
        row.push(working);
        working = "";
        skip_whitespace();
      } else if (chr == '"') in_quote = true;
      else working += chr;
    }

    i++;
  }

  if (working.length > 0) row.push(working);
  if (row.length > 0) rows.push(row);
  return rows;
}
