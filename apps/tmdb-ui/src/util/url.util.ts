export function encodeQueryData(data: Record<string, string>): string {
  const result: string[] = [];
  for (const d in data) {
    result.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }
  return result.join('&');
}
