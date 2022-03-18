interface Streak {
    currentCount: number,
    startDate: string,
    lastLoginDate: string
}

export function streakCounter(_localStorage: Storage, date: Date): Streak {
    return {
        currentCount: 0,
        startDate: "11/11/2021",
        lastLoginDate: "11/11/2021"
    }
}