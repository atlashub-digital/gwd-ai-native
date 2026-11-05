export const scenarios = {
  normal: { name: 'Campanha dentro do limite', amount: 180000, restricted: false, brief: 'Teste de aquisição para o catálogo piloto, com dados sintéticos e criativos aprováveis.' },
  over: { name: 'Pedido acima do orçamento', amount: 320000, restricted: false, brief: 'A unidade pede um lançamento maior do que o saldo disponível.' },
  restricted: { name: 'Dados restritos no pedido', amount: 160000, restricted: true, brief: 'O pedido sinaliza uma lista fictícia de contatos restritos como origem do público.' },
};

export const phases = [
  { role: '01 · Comércio Digital', label: 'Pedido', detail: 'A unidade define o objetivo, o público e o teto proposto.' },
  { role: '02 · Direção / Hermes', label: 'Mandato', detail: 'A direção organiza o briefing e encaminha a missão para Growth.' },
  { role: '03 · Growth', label: 'Plano', detail: 'O centro partilhado propõe criativos, uma métrica e critérios de paragem.' },
  { role: '04 · Finanças e Risco', label: 'Controlo', detail: 'A política verifica saldo, classificação dos dados e permissões.' },
  { role: '05 · Conselho', label: 'Deliberação', detail: 'Dois pareceres de IA e duas decisões humanas são registados separadamente.' },
  { role: '06 · Execução', label: 'Evidência', detail: 'O simulador produz o comprovante e reconcilia o orçamento.' },
];

export const limit = 250000;
const parties = ['Presidência humana', 'Responsável financeiro humano'];
const moves = ['Pedido recebido', 'Mandato de direção registado', 'Plano de Growth registado'];

export function initial(scenario = 'normal') {
  if (!Object.hasOwn(scenarios, scenario)) throw new Error('Cenário desconhecido');
  return { scenario, stage: 0, status: 'running', votes: [null, null], spent: 0, events: [] };
}

function event(state, type, detail) {
  return { ...state, events: [...state.events, { seq: state.events.length + 1, type, detail }] };
}

export function advance(state) {
  if (state.status !== 'running') return state;
  const plan = scenarios[state.scenario];
  if (state.stage < 3) return event({ ...state, stage: state.stage + 1 }, moves[state.stage], phases[state.stage].detail);
  if (state.stage === 3) {
    if (plan.restricted) return event({ ...state, status: 'blocked' }, 'Política bloqueou o pedido', 'A origem do público contém dados restritos. Refaça o pedido com dados autorizados.');
    if (plan.amount > limit) return event({ ...state, status: 'blocked' }, 'Política bloqueou o pedido', 'O montante ultrapassa o saldo simulado de R$ 2.500,00.');
    return event({ ...state, stage: 4, status: 'voting' }, 'Controlo concluído', 'Teto e dados validados. Hermes Direção e Diana Risco emitiram parecer favorável, sem poder de aprovação.');
  }
  if (state.stage === 5 && state.votes.every(v => v === 'yes') && !plan.restricted && plan.amount <= limit) {
    return event({ ...state, stage: 6, status: 'done', spent: plan.amount }, 'Execução simulada conciliada', 'O gasto foi registado no livro fictício. Nenhum anúncio ou pagamento foi enviado.');
  }
  return state;
}

export function vote(state, seat, decision) {
  if (state.status !== 'voting' || ![0, 1].includes(seat) || state.votes[seat] || !['yes', 'no'].includes(decision)) return state;
  const votes = [...state.votes];
  votes[seat] = decision;
  const status = decision === 'no' ? 'rejected' : votes.every(v => v === 'yes') ? 'running' : 'voting';
  const stage = status === 'running' ? 5 : 4;
  return event({ ...state, votes, status, stage }, decision === 'yes' ? 'Aprovação humana' : 'Veto humano', parties[seat]);
}

export function report(state) {
  return { schema: 'genesis-demo/v1', simulation: true, scenario: state.scenario, status: state.status, cap_cents: limit, proposed_cents: scenarios[state.scenario].amount, spent_cents: state.spent, human_votes: state.votes, events: state.events };
}

