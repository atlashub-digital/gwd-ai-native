export const capitalPlans = {
  proof: { name: 'Prova', envelope: 45000, fixed: [6500,700,350,600,700,1000,900], startup: [3000,0,3000], volume: [1,1,0,12,0], price: [4500,1800,0,49.9,149], milestone: 'Demonstrar um processo completo, medir o esforço de revisão e validar procura com conversas e propostas.' },
  pilot: { name: 'Piloto', envelope: 135000, fixed: [18000,1600,1200,1400,2000,4000,2000], startup: [8000,6000,12000], volume: [2,4,2,60,80], price: [6500,3000,3500,49.9,149], milestone: 'Operar uma unidade comercial e um centro partilhado. Medir margem, esforço humano e qualidade antes de ampliar.' },
  scale: { name: 'Expansão', envelope: 405000, fixed: [46000,4500,3500,3500,6000,18000,4500], startup: [22000,24000,45000], volume: [6,14,9,350,480], price: [8500,3500,4200,49.9,149], milestone: 'Replicar fluxos validados, ampliar capacidade e testar uma segunda região. A expansão depende de margem e caixa observados no piloto.' },
};
export const fixedLabels = ['Pessoas e serviços partilhados','Hospedagem, base, cópias e monitorização','Modelos, APIs, voz e imagem','Software, colaboração e suporte','Produção editorial e criativa base','Tráfego pago','Contabilidade, fiscal e jurídico'];
export const startupLabels = ['Montagem, segurança e formalização','Estoque inicial','Capital de giro adicional'];
export const revenueLines = [
  ['Implementação AI e IT','projetos entregues',0.25],
  ['Media Factory e Growth','contratos mensais',0.30],
  ['Workforce e atendimento','contratos mensais',0.20],
  ['Academy e comunidade','membros pagantes',0.22],
  ['Comércio digital','pedidos vendidos',null],
];

const sum = values => values.reduce((total, value) => total + value, 0);
const cents = value => Math.round(value * 100) / 100;
export function calculateEconomy(key, volumePercent = 100) {
  const plan = capitalPlans[key];
  if (!plan || !Number.isFinite(volumePercent) || volumePercent < 0 || volumePercent > 150) throw new Error('Premissa fora do intervalo');
  const fixed = sum(plan.fixed);
  const start = sum(plan.startup);
  const reserve = Math.ceil((fixed * 3 + start) * 0.15);
  const rows = revenueLines.map(([name, unit, rate], i) => {
    const quantity = Math.round(plan.volume[i] * volumePercent / 100);
    const price = plan.price[i];
    const revenue = cents(quantity * price);
    const variable = cents(rate === null ? quantity * 104 : revenue * rate);
    return { name, unit, quantity, price, revenue, variable };
  });
  const revenue = cents(sum(rows.map(row => row.revenue)));
  const variable = cents(sum(rows.map(row => row.variable)));
  const contribution = cents(revenue - variable);
  return { rows, fixed, reserve, cash: fixed * 3 + start + reserve, revenue, variable, contribution, result: cents(contribution - fixed), breakEven: contribution > 0 ? Math.ceil(fixed * revenue / contribution) : null };
}

export const departments = [
  ['Holding e governação', [
    ['Conselho humano e gabinete Hermes','Agora','Mandatos, pareceres e vetos.','Pessoas e assessoria','Decisões rastreáveis e tempo de revisão'],
    ['Estratégia e portfólio','Agora','Metas, entrada de unidades e decisão de investimento operacional.','Pessoas e ferramentas','Margem por unidade e iniciativas encerradas'],
    ['Expansão, alianças e prestadores','Depois','Contratos, mercados e entrada internacional.','Pessoas, jurídico e localização','Parceiros ativos e custo por mercado'],
  ]],
  ['Unidades de negócio', [
    ['AtlasHub Solutions · AI e IT','Agora','Diagnóstico, desenho e implementação de fluxos assistidos.','Horas de entrega, APIs e QA','Preço por projeto e margem de entrega'],
    ['Media Factory e Growth','Agora','Conteúdo, criativos, revisão editorial e experiências de aquisição.','Equipa, edição, mídia e tráfego','Contrato mensal e custo por peça aprovada'],
    ['AtlasHub AI Workforce','Demo','Triagem, rascunhos e encaminhamento com supervisão.','Pessoas, voz, ferramentas e canais','Receita por contrato e custo por atendimento'],
    ['Academy e AtlasClub','Agora','Formações, laboratórios e comunidade de prática.','Produção, suporte e taxas','Receita por turma ou membro e retenção'],
    ['Comércio digital','Demo','Catálogo, revenda, afiliados e dropshipping.','Mercadoria, logística, devoluções e aquisição','Margem de contribuição por pedido'],
    ['Imobiliário e leilões','Futuro','Dossiês, catálogo e apoio operacional.','Dados, revisão e conformidade','Custo por dossiê e receita contratual'],
    ['Seguros e advocacia','Futuro','Apoio administrativo com profissionais responsáveis.','Acessos segregados, revisão e conformidade','Receita de serviço após habilitação'],
  ]],
  ['Centros operacionais', [
    ['Marketing e audiência','Agora','Campanhas, marca e distribuição para as unidades.','Equipa, edição, tráfego e ferramentas','Custo por aquisição e contribuição por campanha'],
    ['Atendimento e operações','Demo','Fila comum, encaminhamento, prazos e incidentes.','Pessoas, canais, software e voz','Custo por pedido e taxa de reabertura'],
    ['REA · Pesquisa e engenharia','Agora','Prototipagem, avaliação de agentes e integrações.','Engenharia, APIs, computação e testes','Tempo até ao piloto e custo por execução'],
    ['Compras, logística e qualidade','Demo','Lotes, fornecedores, entregas e devoluções.','Estoque, frete, inspeção e reservas','Prazo, perdas e custo entregue'],
    ['Conhecimento e produção editorial','Agora','Documentos aprovados, memória institucional e materiais reutilizáveis.','Curadoria, armazenamento e revisão','Taxa de reutilização e erros corrigidos'],
  ]],
  ['Centros administrativos', [
    ['Pessoas e gestão de agentes','Agora','Responsáveis, formação, perfis, permissões e quotas.','Pessoas, formação e ferramentas','Custo por agente e tempo de integração'],
    ['Finanças, tesouraria e controladoria','Agora','Caixa, alçadas, orçamento, reconciliação e centro de custo.','Contabilidade, sistemas e tempo humano','Desvio orçamental e caixa disponível'],
    ['Jurídico, privacidade e compliance','Agora','Contratos, tratamento de dados e enquadramento das unidades.','Assessoria, revisão e controlos','Riscos resolvidos e contratos aprovados'],
    ['Segurança, dados e plataforma','Agora','Identidade, ambientes, backups, observabilidade e incidentes.','Alojamento, armazenamento e segurança','Disponibilidade, incidentes e recuperação'],
    ['Desenvolvimento comercial','Agora','Qualificação, propostas e parcerias comerciais.','Pessoas, CRM e materiais','Conversão de propostas e margem contratada'],
  ]],
];

// Allocation weights are planning assumptions. They apportion the base without adding costs.
export const allocation = [4,3,0,21,14,8,7,5,0,0,8,4,7,0,3,3,4,3,3,3];

