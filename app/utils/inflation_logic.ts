export interface InflationData {
    [year: number]: number;
}

export const HISTORICAL_INFLATION: InflationData = {
    1982: 100.8,
    1983: 22.1,
    1984: 15.0,
    1985: 15.1,
    1986: 17.7,
    1987: 25.2,
    1988: 60.2,
    1989: 251.1,
    1990: 585.8,
    1991: 70.3,
    1992: 43.0,
    1993: 35.3,
    1994: 32.2,
    1995: 27.8,
    1996: 19.9,
    1997: 14.9,
    1998: 11.8,
    1999: 7.3,
    2000: 10.1,
    2001: 5.5,
    2002: 1.9,
    2003: 0.8,
    2004: 3.5,
    2005: 2.1,
    2006: 1.0,
    2007: 2.5,
    2008: 4.2,
    2009: 3.5,
    2010: 2.6,
    2011: 4.3,
    2012: 3.7,
    2013: 0.9,
    2014: 0.0,
    2015: -0.9,
    2016: -0.6,
    2017: 2.0,
    2018: 1.6,
    2019: 2.3,
    2020: 3.4,
    2021: 5.1,
    2022: 14.4,
    2023: 11.4,
    2024: 3.6,
    2025: 3.6,
};

export const DENOMINATION_YEAR = 1995;
export const DENOMINATION_RATIO = 10000;

export interface CalculationResult {
    year: number;
    inflation: number;
    cumulativeMultiplier: number;
    currentValue: number;
    isPredicted: boolean;
}

export const calculateInflation = (
    amount: number,
    startYear: number,
    endYear: number,
    futureInflation: number = 2.5
): CalculationResult[] => {
    const results: CalculationResult[] = [];
    const direction = endYear >= startYear ? 1 : -1;
    const minYear = Math.min(startYear, endYear);
    const maxYear = Math.max(startYear, endYear);

    // 1. Calculate price level multiplier for the period [minYear, maxYear]
    // This is used for "Cumulative Inflation" percentage
    let periodPriceMultiplier = 1;
    const periodMultiplierByYear: { [year: number]: number } = {};
    periodMultiplierByYear[minYear] = 1;

    for (let y = minYear + 1; y <= maxYear; y++) {
        const rate = HISTORICAL_INFLATION[y] !== undefined ? HISTORICAL_INFLATION[y] : futureInflation;
        periodPriceMultiplier *= (1 + rate / 100);
        periodMultiplierByYear[y] = periodPriceMultiplier;
    }

    // 2. Generate year-by-year results based on direction
    const years = [];
    if (direction === 1) {
        for (let y = startYear; y <= endYear; y++) years.push(y);
    } else {
        for (let y = startYear; y >= endYear; y--) years.push(y);
    }

    let runningMultiplier = 1;

    for (let i = 0; i < years.length; i++) {
        const y = years[i];

        // inflationRate for the row - usually comparing y to the logic-previous year
        let inflationRate = 0;
        if (i > 0) {
            const currentY = years[i];
            const prevY = years[i - 1];
            if (direction === 1) {
                inflationRate = HISTORICAL_INFLATION[currentY] !== undefined ? HISTORICAL_INFLATION[currentY] : futureInflation;
                runningMultiplier *= (1 + inflationRate / 100);
            } else {
                inflationRate = HISTORICAL_INFLATION[prevY] !== undefined ? HISTORICAL_INFLATION[prevY] : futureInflation;
                runningMultiplier /= (1 + inflationRate / 100);
            }
        }

        // Denomination Adjustment
        let denominationAdjustment = 1;
        if (startYear < DENOMINATION_YEAR && y >= DENOMINATION_YEAR) {
            denominationAdjustment = 1 / DENOMINATION_RATIO;
        } else if (startYear >= DENOMINATION_YEAR && y < DENOMINATION_YEAR) {
            denominationAdjustment = DENOMINATION_RATIO;
        }

        // The 'cumulativeMultiplier' for the UI should ideally be the price level increase 
        // from the EARLIER year to the LATER year of the current span in the table.
        // Actually, to keep it simple and always positive for the final result:
        // We want PriceLevel(CurrentY) / PriceLevel(StartYear).
        const uiMultiplier = periodMultiplierByYear[y] / periodMultiplierByYear[startYear];

        results.push({
            year: y,
            inflation: inflationRate,
            cumulativeMultiplier: uiMultiplier,
            currentValue: amount * runningMultiplier * denominationAdjustment,
            isPredicted: y > 2025
        });
    }

    return results;
};
