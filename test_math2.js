import { create, all } from 'mathjs';
const customMath = create(all);
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
console.log("asin(1):", customMath.evaluate('asin(1)'));
