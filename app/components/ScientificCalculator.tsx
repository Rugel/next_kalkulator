'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Share_Tech_Mono, Orbitron } from 'next/font/google';
import styles from './ScientificCalculator.module.css';

const shareTechMono = Share_Tech_Mono({ weight: '400', subsets: ['latin'] });
const orbitron = Orbitron({ weight: ['400', '700'], subsets: ['latin'] });

type ActionType = string | null;

const DEFS: Array<[string, string, string, ActionType, ActionType, string]> = [
  // row 0
  ['SHIFT', 'SHIFT', '', 'shift', '', styles.kSHIFT],
  ['ALPHA', 'ALPHA', '', null, null, styles.kALPHA],
  ['MODE', 'MODE', 'SETUP', 'mode', 'mode', styles.kMODE],
  ['BACK', '⌫', 'INS', 'del', 'del', styles.kDEL],
  ['ON', 'ON', '', 'ac', 'ac', styles.kON],
  // row 1
  ['SIN', 'sin', 'sin⁻¹', 'sin(', 'asin(', styles.kFunc],
  ['COS', 'cos', 'cos⁻¹', 'cos(', 'acos(', styles.kFunc],
  ['TAN', 'tan', 'tan⁻¹', 'tan(', 'atan(', styles.kFunc],
  ['HYP', 'hyp', 'hyp⁻¹', 'sinh(', 'asinh(', styles.kFunc],
  ['DRG', 'DRG▸', '', 'drg', 'drg', styles.kFunc],
  // row 2
  ['INV', 'x⁻¹', 'x!', '^-1', 'fact(', styles.kFunc],
  ['SQ', 'x²', '∛', '^2', 'cbrt(', styles.kFunc],
  ['LOG', 'log', '10ˣ', 'log(', '10^(', styles.kFunc],
  ['LN', 'ln', 'eˣ', 'ln(', 'e^(', styles.kFunc],
  ['SQRT', '√', 'xʸ', 'sqrt(', 'pow(', styles.kFunc],
  // row 3
  ['LP', '(', '[', '(', '[', styles.kFunc],
  ['RP', ')', ']', ')', ']', styles.kFunc],
  ['POW', 'xʸ', 'ʸ√x', '^(', 'root(', styles.kFunc],
  ['MP', 'M+', 'M−', 'mplus', 'mminus', styles.kMem],
  ['MR', 'MR', 'MC', 'mr', 'mc', styles.kMem],
  // row 4
  ['N7', '7', '', '7', '', styles.kNum],
  ['N8', '8', '', '8', '', styles.kNum],
  ['N9', '9', '', '9', '', styles.kNum],
  ['DEL', 'DEL', '', 'del', 'del', styles.kDEL],
  ['AC', 'AC', '', 'ac', 'ac', styles.kAC],
  // row 5
  ['N4', '4', '', '4', '', styles.kNum],
  ['N5', '5', '', '5', '', styles.kNum],
  ['N6', '6', '', '6', '', styles.kNum],
  ['MUL', '×', '', '×', '×', styles.kOp],
  ['DIV', '÷', '', '÷', '÷', styles.kOp],
  // row 6
  ['N1', '1', '', '1', '', styles.kNum],
  ['N2', '2', '', '2', '', styles.kNum],
  ['N3', '3', '', '3', '', styles.kNum],
  ['ADD', '+', '', '+', '+', styles.kOp],
  ['SUB', '−', '', '−', '−', styles.kOp],
  // row 7
  ['N0', '0', '', '0', '0', styles.kNum],
  ['DOT', '.', ',', '.', ',', styles.kNum],
  ['EE', '×10ˣ', 'π', 'E', 'π', styles.kFunc],
  ['ANS', 'Ans', 'e', 'ANS', 'e', styles.kFunc],
  ['EQ', '=', '', '=', '=', styles.kEQ],
];

const TRAIL_OPS = /[+\-×÷(,\^]$/;

export default function ScientificCalculator() {
  const [expr, setExpr] = useState('');
  const [ans, setAns] = useState(0);
  const [mem, setMem] = useState(0);
  const [hasMem, setHasMem] = useState(false);
  const [shifted, setShifted] = useState(false);
  const [evaled, setEvaled] = useState(false);
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD' | 'GRD'>('DEG');
  const [resultVal, setResultVal] = useState<string | null>('');
  const [isErr, setIsErr] = useState(false);

  // References for current state to be used inside the evaluate/calc functions without stale closures
  const stateRef = useRef({ expr, ans, mem, evaled, angleMode });
  useEffect(() => {
    stateRef.current = { expr, ans, mem, evaled, angleMode };
  }, [expr, ans, mem, evaled, angleMode]);

  const evaluateMath = useCallback((raw: string, currentAns: number, currentAngle: 'DEG' | 'RAD' | 'GRD') => {
    const deg = currentAngle === 'DEG';
    const grad = currentAngle === 'GRD';
    const toR = deg ? 'x*Math.PI/180' : grad ? 'x*Math.PI/200' : 'x';
    const frR = deg ? '*180/Math.PI' : grad ? '*200/Math.PI' : '';
    let e = raw
      .replace(/ANS/g, `(${currentAns})`)
      .replace(/π/g, 'Math.PI')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/\^/g, '**');

    const fn = new Function(`
      "use strict";
      const PI=Math.PI, E=Math.E;
      const e=E;
      const sin  = x => Math.sin(${toR});
      const cos  = x => Math.cos(${toR});
      const tan  = x => Math.tan(${toR});
      const sinh = x => Math.sinh(x);
      const cosh = x => Math.cosh(x);
      const tanh = x => Math.tanh(x);
      const asin = x => Math.asin(x)${frR};
      const acos = x => Math.acos(x)${frR};
      const atan = x => Math.atan(x)${frR};
      const asinh= x => Math.asinh(x);
      const acosh= x => Math.acosh(x);
      const atanh= x => Math.atanh(x);
      const log  = x => Math.log10(x);
      const ln   = x => Math.log(x);
      const sqrt = x => Math.sqrt(x);
      const cbrt = x => Math.cbrt(x);
      const abs  = x => Math.abs(x);
      const fact = x => { let n=Math.round(x); if(n<0||n>170) return NaN; let r=1; for(let i=2;i<=n;i++) r*=i; return r; };
      const pow  = (x,n) => Math.pow(x,n);
      const root = (x,n) => Math.sign(x)*Math.pow(Math.abs(x),1/n);
      return (${e});
    `);
    return fn();
  }, []);

  const formatResult = (v: number) => {
    if (!isFinite(v)) return v > 0 ? '∞' : '-∞';
    if (Math.abs(v) >= 1e12 || (Math.abs(v) < 1e-9 && v !== 0)) {
      return v.toExponential(6).replace('e+', '×10^').replace('e-', '×10^-');
    }
    return parseFloat(v.toPrecision(10)).toString();
  };

  const showVal = (v: any, err = false) => {
    setIsErr(err);
    if (!err) {
      setResultVal(formatResult(v));
    } else {
      setResultVal(v);
    }
  };

  const clearRes = () => {
    setIsErr(false);
    setResultVal('');
  };

  const livePreview = (newExpr: string) => {
    try {
      const last = newExpr[newExpr.length - 1];
      if (newExpr && !TRAIL_OPS.test(newExpr) && last !== '.') {
        const r = evaluateMath(newExpr, stateRef.current.ans, stateRef.current.angleMode);
        if (isFinite(r)) showVal(r); else clearRes();
      } else {
        clearRes();
      }
    } catch (e) {
      clearRes();
    }
  };

  const act = useCallback((action: ActionType, id: string | null) => {
    if (action === null || action === undefined) return;

    setShifted((prevShifted) => {
      const wasShifted = prevShifted;
      const isShiftButton = id === 'SHIFT';
      const isNowShifted = isShiftButton ? !wasShifted : false;

      const st = stateRef.current;
      let newExpr = st.expr;
      let newEvaled = st.evaled;
      let newAngle = st.angleMode;

      switch (action) {
        case 'shift':
          // handled by outer scope
          return !wasShifted;
        case 'mode':
        case 'drg':
          setAngleMode(prev => prev === 'DEG' ? 'RAD' : prev === 'RAD' ? 'GRD' : 'DEG');
          break;
        case 'ac':
          setExpr(''); setEvaled(false); clearRes();
          break;
        case 'del':
          if (!newExpr) break;
          const fns = ['asin(', 'acos(', 'atan(', 'asinh(', 'acosh(', 'atanh(', 'sinh(', 'cosh(', 'tanh(',
            'sin(', 'cos(', 'tan(', 'log(', 'ln(', 'sqrt(', 'cbrt(', 'fact(', 'e^(', '10^(', 'pow(', 'root(', 'ANS'];
          let cut = false;
          for (const f of fns) { if (newExpr.endsWith(f)) { newExpr = newExpr.slice(0, -f.length); cut = true; break; } }
          if (!cut) { const m = newExpr.match(/\^\($/); if (m) { newExpr = newExpr.slice(0, -2); } else { newExpr = newExpr.slice(0, -1); } }
          setExpr(newExpr); setEvaled(false); clearRes();
          break;
        case 'mplus':
          try { const v = evaluateMath(newExpr, st.ans, st.angleMode); setMem(prev => prev + v); setHasMem(true); } catch (e) { }
          break;
        case 'mminus':
          try { const v = evaluateMath(newExpr, st.ans, st.angleMode); setMem(prev => { const n = prev - v; setHasMem(n !== 0); return n; }); } catch (e) { }
          break;
        case 'mr':
          if (newEvaled) newExpr = '';
          newExpr += st.mem.toString();
          setExpr(newExpr); setEvaled(false); clearRes();
          break;
        case 'mc':
          setMem(0); setHasMem(false);
          break;
        case '=':
          if (!newExpr) break;
          try {
            const r = evaluateMath(newExpr, st.ans, st.angleMode);
            showVal(r);
            setExpr(newExpr + ' =');
            setAns(r);
            setEvaled(true);
          } catch (er) {
            showVal('Math ERROR', true);
            setExpr(newExpr);
          }
          break;
        default:
          if (newEvaled) {
            if (/^[\d(.πe∛√]/.test(action) || action === 'ANS' || action === 'E') newExpr = '';
            else if (/^[+\-×÷^]/.test(action)) newExpr = 'ANS';
            newEvaled = false;
            setEvaled(false);
          }
          if (action === '^2') { newExpr += '^2'; }
          else if (action === '^-1') { newExpr += '^(-1)'; }
          else if (action === '^3') { newExpr += '^3'; }
          else { newExpr += action; }
          setExpr(newExpr);
          livePreview(newExpr);
      }
      return isNowShifted;
    });
  }, [evaluateMath]);

  useEffect(() => {
    const KM: Record<string, string> = {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      '+': '+', '-': '−', '*': '×', '/': '÷',
      '.': '.', '(': ' (', ')': ")", '%': '%',
      'Enter': '=', '=': '=',
      'Backspace': 'del', 'Escape': 'ac',
    };

    const handleKeyDown = (ev: KeyboardEvent) => {
      // Ignore keystrokes if the user is typing in an input or textarea
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }
      if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
      const a = KM[ev.key];
      if (a) { ev.preventDefault(); act(a, null); }
      if (ev.key === '^') { ev.preventDefault(); act('^(', null); }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [act]);

  return (
    <div className={`${styles.calcWrapper} ${shareTechMono.className}`}>
      <div className={styles.calc}>
        <div className={styles.brand}>
          <div className={styles.brandText}>
            <div className={`${styles.brandName} ${orbitron.className}`}>stawka-godzinowa.pl</div>
            <div className={`${styles.brandModel} ${orbitron.className}`}>Kalkulator Naukowy</div>
          </div>
          <div className={styles.solarPanel}>
            <div className={styles.solarSeg}></div>
            <div className={styles.solarSeg}></div>
            <div className={styles.solarSeg}></div>
          </div>
        </div>

        <div className={styles.dispOuter}>
          <div className={styles.statusRow}>
            <span className={`${styles.spill} ${angleMode === 'DEG' ? styles.spillOn : ''}`}>DEG</span>
            <span className={`${styles.spill} ${angleMode === 'RAD' ? styles.spillOn : ''}`}>RAD</span>
            <span className={`${styles.spill} ${angleMode === 'GRD' ? styles.spillOn : ''}`}>GRD</span>
            <span className={`${styles.spill} ${shifted ? styles.spillOn : ''}`}>SHIFT</span>
            <span className={`${styles.spill} ${hasMem ? styles.spillOn : ''}`}>M</span>
          </div>
          <div className={styles.exprRow}>{expr || '0'}</div>
          <div className={`${styles.resultRow} ${isErr ? styles.err : ''}`}>
            {resultVal}
            <span className={styles.cursor}></span>
          </div>
        </div>

        <div className={styles.kpad}>
          {DEFS.map(([id, ml, sl, pa, sa, cls]) => (
            <button
              key={id}
              className={`${styles.k} ${cls} ${id === 'SHIFT' && shifted ? styles.spillOn : ''}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => act(shifted ? sa : pa, id)}
            >
              {sl && <span className={styles.sl}>{sl}</span>}
              <span className={styles.ml}>{ml}</span>
            </button>
          ))}
        </div>
        <div className={styles.baseStrip}></div>
      </div>
    </div>
  );
}
