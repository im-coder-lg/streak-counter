describe("basic test", () => {
    it("should pass", () => {
        expect(true).toBe(true)
    })
})

describe('streakCounter', () => {
    it('should return a streak object with currentCount, startDate and lastLoginDate', () => {
        const mockLocalStorage = ''
        const date = new Date()
        const streak = streakCounter(mockLocalStorage, date)
        
        expect(Object.prototype.hasOwnProperty.call(streak, 'currentCount')).toBe(
            true,
        )
        expect(Object.prototype.hasOwnProperty.call(streak, 'startDate')).toBe(true)
        expect(Object.prototype.hasOwnProperty.call(streak, 'lastLoginDate')).toBe(true)
    })
})