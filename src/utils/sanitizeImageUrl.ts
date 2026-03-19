export function sanitizeImageUrl(input?: string): string {
  if (!input) return "";
  let s = String(input).trim();
  // Take the first URL if multiple are concatenated with a pipe
  const pipeIdx = s.indexOf("|");
  if (pipeIdx !== -1) {
    s = s.slice(0, pipeIdx);
  }
  // Remove trailing unmatched punctuation like ')', ']', '>'
  s = s.replace(/[)>\]]+$/g, "");
  // Remove wrapping quotes/backticks if present
  s = s.replace(/^['"`]+|['"`]+$/g, "");
  return s.trim();
}

