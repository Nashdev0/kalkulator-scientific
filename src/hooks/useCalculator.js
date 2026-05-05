import { useReducer, useEffect } from 'react';
import { create, all } from 'mathjs';

// ─── Math Instance ────────────────────────────────────────────────────────────
const math = create(all);
math.config({ predictable: false }); // Enables complex numbers: sqrt(-1) = i

// ─── 1. Input Sanitizer ───────────────────────────────────────────────────────
/**
 * Translates all human-readable / visual symbols into valid mathjs syntax.
 * ORDER OF OPERATIONS IN THIS CHAIN IS CRITICAL.
 */
function sanitize(expr) {
  return expr
    // Arithmetic operators
    .replace(/×/g, '*')
    .replace(/÷/g, '/')

    // Absolute value: |expr| → abs(expr)
    // Iteratively replace innermost pipes first to handle nesting
    .replace(/\|([^|]+)\|/g, 'abs($1)')

    // Degree symbol: convert  90°  →  90 deg  (before any other trig processing)
    .replace(/(\d+(?:\.\d+)?)\s*°/g, '$1 deg')
    .replace(/°/g, ' deg') // catch any remaining ° not preceded by a digit

    // Roots
    .replace(/√\(/g, 'sqrt(')
    .replace(/x√y\(/g, 'nthRoot(')

    // Sigma / sum
    .replace(/∑\(/g, 'sum(')

    // Constants
    .replace(/π/g, 'pi')

    // Combinatorics
    .replace(/nPr\(/g, 'permutations(')
    .replace(/nCr\(/g, 'combinations(')

    // ── Logarithms ── ORDER MATTERS ──────────────────────────────────────────
    // Step 1: logₙ( → temp placeholder (to survive the log( replacement below)
    .replace(/log[ₙn]\(/g, '__LOGBASE__(')
    // Step 2: user-typed log(x) → log10(x)  [standard calc behaviour]
    .replace(/log\(/g, 'log10(')
    // Step 3: ln(x) → log(x)  [mathjs `log` with 1 arg = natural log]
    .replace(/ln\(/g, 'log(')
    // Step 4: restore logₙ → log(x, base)  [mathjs `log` with 2 args = custom base]
    .replace(/__LOGBASE__\(/g, 'log(');
}

// ─── 2. Expression Evaluator ──────────────────────────────────────────────────
function evaluateExpression(rawExpr, mode, angleMode) {
  const expr = sanitize(rawExpr);

  // If the expression already contains an explicit `deg` unit (from °),
  // mathjs handles the conversion natively — skip the DEG override to avoid
  // double-conversion.
  const hasExplicitDeg = /\bdeg\b/.test(expr);

  if (angleMode === 'DEG' && mode === 'Scientific' && !hasExplicitDeg) {
    // Build a custom math scope that wraps trig fns to accept plain degrees
    const customMath = create(all);
    customMath.config({ predictable: false });

    // Forward trig  (sin, cos, tan …)
    ['sin', 'cos', 'tan', 'sec', 'cot', 'csc'].forEach(name => {
      const fn = customMath[name];
      customMath.import({
        [name]: (x) => {
          try {
            return typeof x === 'number'
              ? fn(customMath.unit(x, 'deg'))
              : fn(x);
          } catch {
            return fn(x);
          }
        }
      }, { override: true });
    });

    // Inverse trig  (asin, acos, atan …) — return degrees
    ['asin', 'acos', 'atan', 'asec', 'acot', 'acsc'].forEach(name => {
      const fn = customMath[name];
      customMath.import({
        [name]: (x) => {
          const res = fn(x);
          return typeof res === 'number' ? (res * 180) / Math.PI : res;
        }
      }, { override: true });
    });

    return customMath.evaluate(expr);
  }

  return math.evaluate(expr);
}

// ─── 3. Format Result ─────────────────────────────────────────────────────────
/**
 * Converts a mathjs result to a clean string.
 * `precision: 14` eliminates floating-point noise (0.000000000001 artefacts)
 * while preserving scientific-grade accuracy.
 */
function formatResult(result) {
  if (result === null || result === undefined) return '';

  // Complex number (e.g. sqrt(-1) → "i")
  if (typeof result === 'object' && result.isComplex) {
    return result.toString();
  }

  return math.format(result, { precision: 14 });
}

// ─── State ────────────────────────────────────────────────────────────────────
const initialState = {
  expression: '',
  result: '',
  history: [],
  memory: 0,
  mode: 'Scientific', // Scientific | Programmer | Graphing
  angleMode: 'RAD',   // RAD | DEG
  isResult: false,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case 'APPEND':
      if (state.isResult) {
        return { ...state, expression: action.payload, isResult: false };
      }
      return { ...state, expression: state.expression + action.payload };

    case 'CLEAR':
      return { ...state, expression: '', result: '', isResult: false };

    case 'DELETE':
      return {
        ...state,
        expression: state.isResult ? '' : state.expression.slice(0, -1),
        result: '',
        isResult: false,
      };

    case 'TOGGLE_ANGLE_MODE':
      return { ...state, angleMode: state.angleMode === 'RAD' ? 'DEG' : 'RAD', isResult: false };

    // ── 5. Error Boundary ───────────────────────────────────────────────────
    case 'EVALUATE': {
      if (!state.expression) return state;
      try {
        let raw = evaluateExpression(state.expression, state.mode, state.angleMode);
        const formatted = formatResult(raw);
        const newHistory = [
          { expression: state.expression, result: formatted },
          ...state.history,
        ].slice(0, 50);
        return {
          ...state,
          result: formatted,
          expression: formatted,
          history: newHistory,
          isResult: true,
        };
      } catch (e) {
        console.warn('Evaluate error:', e.message);
        return { ...state, result: 'Syntax Error', isResult: true };
      }
    }

    case 'CALCULATE_LIVE': {
      if (!state.expression) return { ...state, result: '' };
      try {
        let raw = evaluateExpression(state.expression, state.mode, state.angleMode);
        return { ...state, result: formatResult(raw) };
      } catch {
        return { ...state, result: '' };
      }
    }

    case 'LOAD_STATE':
      return { ...state, ...action.payload };

    case 'RESTORE_HISTORY':
      return { ...state, expression: action.payload, isResult: false };

    case 'CLEAR_HISTORY':
      return { ...state, history: [] };

    case 'SET_MODE':
      return { ...state, mode: action.payload, expression: '', result: '', isResult: false };

    case 'MEMORY_ADD': {
      const val = parseFloat(state.result || state.expression || '0');
      return { ...state, memory: state.memory + (isNaN(val) ? 0 : val), isResult: true };
    }
    case 'MEMORY_SUB': {
      const val = parseFloat(state.result || state.expression || '0');
      return { ...state, memory: state.memory - (isNaN(val) ? 0 : val), isResult: true };
    }
    case 'MEMORY_RECALL':
      return { ...state, expression: state.memory.toString(), isResult: false };

    case 'MEMORY_CLEAR':
      return { ...state, memory: 0 };

    default:
      return state;
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Restore persisted state
  useEffect(() => {
    const saved = localStorage.getItem('calc-advanced-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({
          type: 'LOAD_STATE',
          payload: {
            history: parsed.history || [],
            memory: parsed.memory || 0,
            angleMode: parsed.angleMode || 'RAD',
          },
        });
      } catch (e) {
        console.error('Failed to restore state:', e);
      }
    }
  }, []);

  // Persist state changes
  useEffect(() => {
    localStorage.setItem(
      'calc-advanced-state',
      JSON.stringify({ history: state.history, memory: state.memory, angleMode: state.angleMode })
    );
  }, [state.history, state.memory, state.angleMode]);

  // Live evaluation while typing
  useEffect(() => {
    if (!state.isResult && state.mode !== 'Graphing') {
      dispatch({ type: 'CALCULATE_LIVE' });
    }
  }, [state.expression, state.isResult, state.mode, state.angleMode]);

  return [state, dispatch];
}
