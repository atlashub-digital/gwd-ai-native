import assert from 'node:assert/strict';
import test from 'node:test';
import { advance, initial, vote, report } from '../dist/engine.js';

function toGate(scenario) {
  let state = initial(scenario);
  for (let i = 0; i < 4; i++) state = advance(state);
  return state;
}

test('apenas duas aprovações humanas habilitam a execução; reexecução não duplica gasto', () => {
  const gate = toGate('normal');
  assert.equal(gate.status, 'voting');
  assert.equal(advance(gate).spent, 0);
  const one = vote(gate, 0, 'yes');
  assert.equal(advance(one).spent, 0);
  assert.equal(vote(one, 0, 'no'), one);
  const authorized = vote(one, 1, 'yes');
  assert.equal(authorized.spent, 0);
  const done = advance(authorized);
  assert.equal(done.status, 'done');
  assert.equal(advance(done), done);
  const exported = report(done);
  assert.equal(exported.spent_cents, 180000);
  assert.equal(exported.simulation, true);
  assert.equal(exported.events.length, 7);
});

test('um veto humano termina a missão mesmo com outro voto favorável', () => {
  const rejected = vote(vote(toGate('normal'), 0, 'yes'), 1, 'no');
  assert.equal(rejected.status, 'rejected');
  assert.equal(advance(rejected).spent, 0);
  assert.equal(vote(rejected, 1, 'yes'), rejected);
});

test('saldo insuficiente ou origem restrita bloqueiam antes dos votos', () => {
  for (const scenario of ['over', 'restricted']) {
    const blocked = toGate(scenario);
    assert.equal(blocked.status, 'blocked');
    assert.equal(blocked.spent, 0);
    assert.equal(vote(blocked, 0, 'yes'), blocked);
    assert.equal(advance(blocked), blocked);
  }
});

