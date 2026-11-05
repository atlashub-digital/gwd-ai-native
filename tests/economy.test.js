import assert from 'node:assert/strict';
import test from 'node:test';
import { allocation, calculateEconomy, departments } from '../dist/economy.js';

test('caixa reconcilia os três envelopes de 90 dias e não depende de vendas', () => {
  for (const [scenario, fixed, cash] of [['proof',10750,43988],['pilot',30200,134090],['scale',86000,401350]]) {
    const base = calculateEconomy(scenario);
    const zero = calculateEconomy(scenario, 0);
    assert.equal(base.fixed, fixed);
    assert.equal(base.cash, cash);
    assert.equal(zero.cash, cash);
    assert.equal(zero.result, -fixed);
    assert.equal(zero.breakEven, null);
  }
});

test('receita, contribuição e resultado refletem os custos variáveis e o volume', () => {
  const pilot = calculateEconomy('pilot');
  assert.equal(pilot.revenue, 46914);
  assert.equal(pilot.variable, 17228.68);
  assert.equal(pilot.result, -514.68);
  assert.ok(calculateEconomy('pilot', 130).result > pilot.result);
  assert.throws(() => calculateEconomy('pilot', 151));
});

test('cada departamento tem cota e as cotas totalizam 100%', () => {
  assert.equal(allocation.length, departments.flatMap(([, items]) => items).length);
  assert.equal(allocation.reduce((a, b) => a + b, 0), 100);
});

