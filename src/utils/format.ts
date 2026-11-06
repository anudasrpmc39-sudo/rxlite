export function formatDate(value: string): string {
  if (!value) return "";
  const d = new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime()) ? value : new Intl.DateTimeFormat("en-GB").format(d);
}
export function ageFromDob(dob: string): string {
  if (!dob) return "";
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return "";
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (now.getDate() < birth.getDate()) months--;
  if (months < 0) { years--; months += 12; }
  if (years > 0) return `${years} year${years === 1 ? "" : "s"}`;
  if (months > 0) return `${months} month${months === 1 ? "" : "s"}`;
  return "Under 1 month";
}
export function uid(prefix: string): string { return `${prefix}-${crypto.randomUUID().slice(0,8).toUpperCase()}`; }
