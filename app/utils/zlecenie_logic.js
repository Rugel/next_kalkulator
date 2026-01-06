
export const calculateZlecenie = (brutto, options) => {
    const {
        isStudentU26, // Student under 26: Fully exempt from ZUS and Tax
        isU26,        // Person under 26 (not student): Exempt from Tax only (Zerowy PIT)
        isChorobowe,  // Voluntary Sickness Insurance (2.45%)
        isPit2,       // Kwota wolna (300 PLN deduction)
        costsRate = 0.2 // KUP: 20% standard, 50% copyright
    } = options;

    let results = {
        brutto: parseFloat(brutto),
        emerytalne: 0,
        rentowe: 0,
        chorobowe: 0,
        razemZus: 0,
        zdrowotne: 0,
        koszty: 0,
        podstawaOpodatkowania: 0,
        podatek: 0,
        netto: 0,
    };

    if (isNaN(results.brutto) || results.brutto < 0) return results;

    // Student under 26 exception: No ZUS, No Tax
    if (isStudentU26) {
        results.netto = results.brutto;
        return results;
    }

    // ZUS Calculations
    // Standard rates for Umowa Zlecenie (mandatory typically if it's the only title)
    results.emerytalne = parseFloat((results.brutto * 0.0976).toFixed(2));
    results.rentowe = parseFloat((results.brutto * 0.015).toFixed(2));

    if (isChorobowe) {
        results.chorobowe = parseFloat((results.brutto * 0.0245).toFixed(2));
    }

    results.razemZus = parseFloat((results.emerytalne + results.rentowe + results.chorobowe).toFixed(2));

    // Health Insurance (Zdrowotne)
    // Base is Brutto - ZUS
    const podstawaZdrowotne = results.brutto - results.razemZus;
    results.zdrowotne = parseFloat((podstawaZdrowotne * 0.09).toFixed(2));

    // Tax Calculations
    // KUP (Koszty Uzyskania Przychodu)
    // Base for KUP is Brutto - ZUS
    const podstawaKup = results.brutto - results.razemZus;
    results.koszty = parseFloat((podstawaKup * costsRate).toFixed(2));

    // Tax Base (Podstawa Opodatkowania)
    // Brutto - ZUS - KUP
    // Rounded to integer typically ? Actually rules say intermediate rounding might differ, 
    // but final tax advance is rounded to full PLN. We will keep decimals for precision until final step usually.
    // Standard practice for calculator: round base to 0 decimals or keep 2. 
    // Official method: Round result to 1 PLN.
    let taxBase = podstawaKup - results.koszty;
    results.podstawaOpodatkowania = Math.round(taxBase);

    // Calculate Tax (Zaliczka na PIT)
    if (isU26) {
        // Zerowy PIT for U26 (up to limit ~85k, assuming here within limit for monthly)
        results.podatek = 0;
    } else {
        // 12% rate (first threshold)
        let taxRaw = results.podstawaOpodatkowania * 0.12;

        // Kwota wolna (PIT-2) -> 300 PLN
        if (isPit2) {
            taxRaw -= 300;
        }

        if (taxRaw < 0) taxRaw = 0;
        results.podatek = Math.round(taxRaw);
    }

    // Netto
    // Brutto - ZUS - Zdrowotne - Podatek
    results.netto = parseFloat((results.brutto - results.razemZus - results.zdrowotne - results.podatek).toFixed(2));

    return results;
};
