import { getMovableHolidays } from '../karta_godzin/holidays.js';

/**
 * Check if a date is a weekend (Saturday or Sunday)
 * @param {Date} date - Date to check
 * @returns {boolean} True if weekend
 */
function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
}

/**
 * Check if a date is a Polish holiday
 * @param {Date} date - Date to check
 * @param {number} year - Year
 * @returns {boolean} True if holiday
 */
function isHoliday(date, year) {
    const month = date.getMonth() + 1; // 0-11 to 1-12
    const day = date.getDate();

    // Fixed holidays
    const fixedHolidays = [
        { month: 1, day: 1 },   // New Year
        { month: 1, day: 6 },   // Epiphany
        { month: 5, day: 1 },   // Labor Day
        { month: 5, day: 3 },   // Constitution Day
        { month: 8, day: 15 },  // Assumption
        { month: 11, day: 1 },  // All Saints
        { month: 11, day: 11 }, // Independence Day
        { month: 12, day: 24 }, // Christmas Eve (Wigilia)
        { month: 12, day: 25 }, // Christmas
        { month: 12, day: 26 }  // Boxing Day
    ];

    // Check fixed holidays
    if (fixedHolidays.some(h => h.month === month && h.day === day)) {
        return true;
    }

    // Check movable holidays
    const movableHolidays = getMovableHolidays(year);
    return movableHolidays.some(h => h.month === month && h.day === day);
}

/**
 * Calculate number of working days (Mon-Fri, excluding holidays) for a given month
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @returns {number} Number of working days
 */
export function calculateWorkingDays(year, month) {
    let workingDays = 0;

    // Get number of days in the month
    const daysInMonth = new Date(year, month, 0).getDate();

    // Iterate through all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);

        // Count if it's not a weekend and not a holiday
        if (!isWeekend(date) && !isHoliday(date, year)) {
            workingDays++;
        }
    }

    return workingDays;
}
