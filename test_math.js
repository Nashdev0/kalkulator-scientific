import { create, all } from 'mathjs';
const math = create(all);
const customMath = create(all);
const trigFns = ['sin', 'cos', 'tan', 'sec', 'cot', 'csc', 'sinh', 'cosh', 'tanh'];
trigFns.forEach(name => {
  const fn = customMath[name];
  customMath.import({
    [name]: function(x) {
      if (typeof x === 'number') {
        return fn(customMath.unit(x, 'deg'));
      }
      try { return fn(customMath.unit(x, 'deg')); } catch(e) { return fn(x); }
    }
  }, { override: true });
});
console.log("sin(90):", customMath.evaluate('sin(90)'));
try { console.log("sinh(90):", customMath.evaluate('sinh(90)')); } catch(e) { console.log("sinh(90) error:", e.message); }
