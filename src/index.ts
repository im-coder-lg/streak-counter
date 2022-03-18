import { formattedDate } from "./lib";
import { buildStreak, Streak, KEY } from './utils'

function assertStreakExists(
  streakInLocalStorage: string | null
): streakInLocalStorage is string {
  return streakInLocalStorage !== null && streakInLocalStorage !== "";
}

function shouldIncrementOrResetStreakCount(
  currentDate: Date,
  lastLoginDate: string
): "increment" | "reset" | "none" {
  // We get 11/5/2021
  // so to get 5, we split on / and get the second item
  const difference = currentDate.getDate() - parseInt(lastLoginDate.split("/")[1]);
  
  if (difference === 0) {
    return "none";
  }
  // This means they logged in the day after the currentDate
  if (difference === 1) {
    return "increment";
  }
  // Otherwise they logged in after a day, which would
  // break the streak
  return "reset";
}
export function streakCounter(_localStorage: Storage, date: Date): Streak {
  const streakInLocalStorage = _localStorage.getItem(KEY);
  // const doesStreakExist = streakInLocalStorage !== null && streakInLocalStorage !== "";

  if (assertStreakExists(streakInLocalStorage)) {
    try {
      const streak = JSON.parse(streakInLocalStorage);
      const Storage = _localStorage;
      const state = shouldIncrementOrResetStreakCount(
        date,
        streak.lastLoginDate
      );
      const SHOULD_INCREMENT = state === "increment";
      const SHOULD_RESET = state === "reset";
      if (SHOULD_INCREMENT) {
        const updatedStreak = buildStreak(date, {
          currentCount: streak.currentCount + 1,
          lastLoginDate: formattedDate(date),
        });
        Storage.setItem(KEY, JSON.stringify(updatedStreak));
        return updatedStreak;
      }
      if (SHOULD_RESET) {
        const updatedStreak = buildStreak(date);
        Storage.setItem(KEY, JSON.stringify(updatedStreak));
        return updatedStreak;
      }
      return streak;
    } catch (error) {
      console.error("Failed to parse streak from localStorage");
    }
  }

  const streak = buildStreak(date);

  _localStorage.setItem(KEY, JSON.stringify(streak));
  return streak;
}
