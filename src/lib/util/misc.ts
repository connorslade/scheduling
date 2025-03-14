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
