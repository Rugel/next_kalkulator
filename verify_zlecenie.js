
const { calculateZlecenie } = require('./app/utils/zlecenie_logic');

console.log('--- Verification Start ---');

// Case 1: Student < 26
const c1 = calculateZlecenie(1000, { isStudentU26: true });
console.log('Case 1 (Student < 26, 1000):', c1.netto === 1000 ? 'PASS' : `FAIL ${c1.netto}`);

// Case 2: Standard, 5000 Brutto, No Chorobowe, KUP 20%, PIT-2 Yes
const c2 = calculateZlecenie(5000, { isStudentU26: false, isU26: false, isChorobowe: false, isPit2: true, costsRate: 0.2 });
console.log('Case 2 (Standard, 5000):');
console.log('  ZUS (Exp: 563.00):', c2.razemZus);
console.log('  Zdrowotne (Exp: 399.33):', c2.zdrowotne);
console.log('  Podatek (Exp: 126):', c2.podatek);
console.log('  Netto (Exp: 3911.67):', c2.netto);

// Case 3: U26 (Not Student), 5000 Brutto, No Chorobowe
// ZUS: 563.
// Zdrow: 399.33.
// Tax: 0.
// Netto: 5000 - 563 - 399.33 = 4037.67.
const c3 = calculateZlecenie(5000, { isStudentU26: false, isU26: true, isChorobowe: false, isPit2: true, costsRate: 0.2 });
console.log('Case 3 (U26 Not Student, 5000):');
console.log('  Podatek (Exp: 0):', c3.podatek);
console.log('  Netto (Exp: 4037.67):', c3.netto);

console.log('--- Verification End ---');
