import { streakCounter } from "./index";

const date = new Date();

export function formattedDate(date: Date): String {
  return date.toLocaleString("en-US").split(",")[0];
}
