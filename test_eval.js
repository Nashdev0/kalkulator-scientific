import { create, all } from 'mathjs';

const math = create(all);

function evaluateExpression(expr, mode, angleMode) {
  if (angleMode === 'DEG' && mode === 'Scientific') {
    const customMath = create(all);
    
    const trigFns = ['sin', 'cos', 'tan', 'sec', 'cot', 'csc'];
    trigFns.forEach(name => {
      const fn = customMath[name];
      customMath.import({
        [name]: function(x) {
          if (typeof x === 'number') {
            return fn(customMath.unit(x, 'deg'));
          }
          if (customMath.isComplex(x)) {
            return fn(x);
          }
          try {
             return fn(customMath.unit(x, 'deg'));
          } catch(e) {
             return fn(x);
          }
        }
      }, { override: true });
    });
    
    const invTrigFns = ['asin', 'acos', 'atan', 'asec', 'acot', 'acsc'];
    invTrigFns.forEach(name => {
      const fn = customMath[name];
      customMath.import({
        [name]: function(x) {
          const res = fn(x);
          if (typeof res === 'number') {
            return (res * 180) / Math.PI;
          }
          return res;
        }
      }, { override: true });
    });

    return customMath.evaluate(expr);
  }
  
  return math.evaluate(expr);
}

const tests = [
  { expr: "5 + 5", mode: "Scientific", angleMode: "RAD", expect: 10 },
  { expr: "sin(90)", mode: "Scientific", angleMode: "DEG", expect: 1 },
  { expr: "cos(180)", mode: "Scientific", angleMode: "DEG", expect: -1 },
  { expr: "tan(45)", mode: "Scientific", angleMode: "DEG", expect: 1 },
  { expr: "asin(1)", mode: "Scientific", angleMode: "DEG", expect: 90 },
  { expr: "acos(-1)", mode: "Scientific", angleMode: "DEG", expect: 180 },
  { expr: "atan(1)", mode: "Scientific", angleMode: "DEG", expect: 45 },
  { expr: "sinh(1)", mode: "Scientific", angleMode: "DEG", expect: math.sinh(1) },
  { expr: "cosh(1)", mode: "Scientific", angleMode: "RAD", expect: math.cosh(1) },
  { expr: "5!", mode: "Scientific", angleMode: "RAD", expect: 120 },
  { expr: "abs(-50)", mode: "Scientific", angleMode: "RAD", expect: 50 },
  { expr: "5 mod 2", mode: "Scientific", angleMode: "RAD", expect: 1 },
  { expr: "permutations(5, 2)", mode: "Scientific", angleMode: "RAD", expect: 20 },
  { expr: "combinations(5, 2)", mode: "Scientific", angleMode: "RAD", expect: 10 },
  { expr: "nthRoot(27, 3)", mode: "Scientific", angleMode: "RAD", expect: 3 },
  { expr: "sum(1, 2, 3)", mode: "Scientific", angleMode: "RAD", expect: 6 },
  { expr: "sin(pi/2)", mode: "Scientific", angleMode: "RAD", expect: 1 },
];

let failed = 0;
tests.forEach(t => {
  try {
    let result = evaluateExpression(t.expr, t.mode, t.angleMode);
    
    // JS floating point check
    const diff = Math.abs(result - t.expect);
    if (diff > 1e-10) {
      console.log(`❌ Failed: ${t.expr} in ${t.angleMode}. Expected ${t.expect}, got ${result}`);
      failed++;
    } else {
      console.log(`✅ Passed: ${t.expr} = ${result}`);
    }
  } catch (err) {
    console.log(`❌ Error evaluating ${t.expr}: ${err.message}`);
    failed++;
  }
});

if (failed === 0) {
  console.log("All tests passed perfectly.");
}
