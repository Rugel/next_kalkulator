/**
 * Utility functions for calculating Polish holidays, including movable holidays
 * based on Easter (Wielkanoc) date.
 */

/**
 * Calculate Easter Sunday date for a given year using Computus algorithm (Gauss method)
 * @param {number} year - The year to calculate Easter for
 * @returns {object} Object with month (1-12) and day of Easter Sunday
 */
export function calculateEaster(year) {
    // Computus algorithm (Anonymous Gregorian algorithm)
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    return { month, day };
}

/**
 * Add days to a date and return the result
 * @param {number} month - Month (1-12)
 * @param {number} day - Day of month
 * @param {number} year - Year
 * @param {number} daysToAdd - Number of days to add
 * @returns {object} Object with month and day after adding days
 */
function addDays(month, day, year, daysToAdd) {
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + daysToAdd);
    return {
        month: date.getMonth() + 1,
        day: date.getDate()
    };
}

/**
 * Get all Polish movable holidays for a given year
 * @param {number} year - The year to calculate holidays for
 * @returns {Array} Array of {month, day} objects for all movable holidays
 */
export function getMovableHolidays(year) {
    const easter = calculateEaster(year);
    const holidays = [];

    // Easter Sunday (Wielkanoc)
    holidays.push({ month: easter.month, day: easter.day });

    // Easter Monday (Poniedziałek Wielkanocny) - Easter + 1 day
    holidays.push(addDays(easter.month, easter.day, year, 1));

    // Pentecost/Whitsunday (Zielone Świątki) - Easter + 49 days
    holidays.push(addDays(easter.month, easter.day, year, 49));

    // Corpus Christi (Boże Ciało) - Easter + 60 days
    holidays.push(addDays(easter.month, easter.day, year, 60));

    return holidays;
}
