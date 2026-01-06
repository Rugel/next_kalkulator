export const calculateB2B = (revenue, costs, type, options) => {
    // defaults
    const {
        zusVariant = 'duzy_zus', // 'ulga_start', 'preferencyjny', 'maly_zus', 'duzy_zus'
        isChorobowe = true,
        ryczaltRate = 0.12, // 12% default for ryczałt
        isFp = true // Fundusz Pracy (usually true for Duży ZUS)
    } = options;

    const rev = parseFloat(revenue) || 0;
    const cost = parseFloat(costs) || 0;

    // Constants 2026 (Forecasts)
    const MIN_WAGE = 4806;
    const AVG_WAGE_FORECAST = 9420; // For ZUS base
    const AVG_WAGE_Q4_2025_EST = 8600; // For Ryczałt health base estimate

    // ZUS Bases
    let zusBase = 0;
    if (zusVariant === 'duzy_zus') {
        zusBase = AVG_WAGE_FORECAST * 0.60; // 5652
    } else if (zusVariant === 'preferencyjny') {
        zusBase = MIN_WAGE * 0.30; // 1441.80
    } else if (zusVariant === 'ulga_start') {
        zusBase = 0; // Only Health applies
    }
    // Note: Maly ZUS Plus depends on individual income, simplified here to Preferencyjny or Duży logic for now or specific input implies base. 
    // Usually calculators ask for "Dochód z poprzedniego roku" for Mały ZUS Plus. 
    // We will stick to standard variants for MVP.

    // ZUS Rates
    const rates = {
        emerytalne: 0.1952,
        rentowe: 0.08,
        chorobowe: 0.0245,
        wypadkowe: 0.0167,
        fp: 0.0245
    };

    let zus = {
        emerytalne: 0,
        rentowe: 0,
        chorobowe: 0,
        wypadkowe: 0,
        fp: 0,
        total: 0
    };

    if (zusVariant !== 'ulga_start') {
        zus.emerytalne = zusBase * rates.emerytalne;
        zus.rentowe = zusBase * rates.rentowe;
        zus.wypadkowe = zusBase * rates.wypadkowe;
        if (isChorobowe) {
            zus.chorobowe = zusBase * rates.chorobowe;
        }
        if (zusVariant === 'duzy_zus' && isFp) {
            zus.fp = zusBase * rates.fp;
        }
    }

    zus.total = zus.emerytalne + zus.rentowe + zus.chorobowe + zus.wypadkowe + zus.fp;

    // Income for Tax/Health
    // Ryczałt: Revenue is the base for tax. Costs irrelevant for tax but relevant for profitability? No, only revenue counts.
    // Skala/Liniowy: Income = Revenue - Costs - ZUS(social)

    let income = rev - cost - zus.total;
    if (type === 'ryczalt') {
        income = rev; // Base for tax is revenue.
    }

    // Health Insurance
    let healthBase = 0;
    let healthContribution = 0;

    // Limits for Health deduction (Liniowy/Ryczałt)
    // 2026 limit estimate: 14100 PLN for Liniowy deduction.
    // Ryczałt deduction: 50% of contribution.

    if (type === 'skala') {
        // 9% of income, min base is Min Wage
        // Income for health is (Revenue - Costs - ZUS)
        let base = rev - cost - zus.total;
        if (base < MIN_WAGE) base = MIN_WAGE;
        healthContribution = base * 0.09;
    } else if (type === 'liniowy') {
        // 4.9% of income, min base is Min Wage
        let base = rev - cost - zus.total;
        if (base < MIN_WAGE) base = MIN_WAGE;
        healthContribution = base * 0.049;
    } else if (type === 'ryczalt') {
        // 60k / 300k thresholds based on Annual Revenue
        // We calculate monthly, assuming annual = monthly * 12 or just based on current monthly tier?
        // Usually calculators assume the tier based on input annual or just ask user.
        // Let's infer annual from monthly * 12 for simplicity.
        let annualRev = rev * 12;
        let basePct = 0;
        if (annualRev <= 60000) basePct = 0.60;
        else if (annualRev <= 300000) basePct = 1.00;
        else basePct = 1.80;

        healthBase = AVG_WAGE_Q4_2025_EST * basePct;
        healthContribution = healthBase * 0.09;
    }

    // Deducting Health from Tax Base (if applicable)
    let taxBase = 0;
    let tax = 0;

    if (type === 'skala') {
        // Base = Income (Rev - Cost - ZUS). Health NOT deductible.
        taxBase = Math.round(rev - cost - zus.total);
        // Tax Scale
        if (taxBase <= 120000 / 12) { // Monthly threshold approach standard
            // 12% minus kwota wolna (3600 / 12 = 300)
            let taxCalc = (taxBase * 0.12) - 300;
            if (taxCalc < 0) taxCalc = 0;
            tax = taxCalc;
        } else {
            // 32% over 10k monthly excess + 12% of 10k
            // First 10k: 1200 - 300 = 900 ? No, kwota wolna applies to total.
            // Simplified monthly:
            // Up to 10k: 12% - 300.
            // Over 10k: 10800 tax annually on 120k... 
            // Let's simplify: 
            // 12% of base. If base > 10000 (120k/12), then...
            // Actually it's cumulative. For monthly calculator, we assume "in first bracket" or "in second".
            // Let's assume standard annualized / 12 approach.
            if (taxBase > 10000) {
                tax = 10000 * 0.12 - 300 + (taxBase - 10000) * 0.32;
            } else {
                tax = taxBase * 0.12 - 300;
            }
        }
    } else if (type === 'liniowy') {
        // Base = Rev - Cost - ZUS - Health(deductible up to limit)
        // Limit 2026 ~ 14100 annual ~ 1175 monthly
        let healthDeductible = healthContribution;
        if (healthDeductible > 1175) healthDeductible = 1175;

        taxBase = Math.round(rev - cost - zus.total - healthDeductible);
        if (taxBase < 0) taxBase = 0;
        tax = taxBase * 0.19;

    } else if (type === 'ryczalt') {
        // Base = Rev - ZUS - Health(50% deductible)
        let healthDeductible = healthContribution * 0.50;
        taxBase = Math.round(rev - zus.total - healthDeductible);
        if (taxBase < 0) taxBase = 0;
        tax = taxBase * ryczaltRate;
    }

    if (tax < 0) tax = 0;

    // Netto = Revenue - Costs - ZUS - Health - Tax
    // This is "Income Netto" (Dochód na rękę)
    // Note: Costs are an expense, so they reduce cash in hand if we talk about "Company Money".
    // But usually "Netto" for B2B means: Invoice Netto - ZUS - Tax - Health.
    // If we subtract Costs (which are external invoices), we get "Dochód".
    // Let's return "Dochód Netto" (Profit after tax/zus).
    let netCheck = rev - cost - zus.total - healthContribution - tax;

    return {
        revenue: rev,
        costs: cost,
        zus,
        healthContribution,
        taxBase,
        tax,
        netto: netCheck
    };
};
