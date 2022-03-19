import { formattedDate } from "./lib";

export interface Streak {
  currentCount: number;
  startDate: String;
  lastLoginDate: String;
}
export const KEY = "streak";
export function buildStreak(date: Date, overrideDefaults?: Partial<Streak>) {
  const defaultStreak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  };
  return {
    ...defaultStreak,
    ...overrideDefaults,
  };
}
export function updateStreak(storage: Storage, streak: Streak): void {
  storage.setItem(KEY, JSON.stringify(streak));
}

export function assertStreakExists(
  streakInLocalStorage: string | null
): streakInLocalStorage is string {
  return streakInLocalStorage !== null && streakInLocalStorage !== "";
}

export function shouldIncrementOrResetStreakCount(
  currentDate: Date,
  lastLoginDate: string
): "increment" | "reset" | "none" {
  const difference =
    currentDate.getDate() - parseInt(lastLoginDate.split("/")[1]);

  if (difference === 0) {
    return "none";
  }
  if (difference === 1) {
    return "increment";
  }
  return "reset";
}
