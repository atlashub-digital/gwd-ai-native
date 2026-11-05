# Integração e operação do portal Genesis

Versão 0.3 · 5 de novembro de 2026.

## Estado

O campus é uma cena WebGL original em Three.js. A galáxia representa uma taxonomia sintética. O fluxo de campanha é determinístico e não executa ferramentas externas. Os nomes designam papéis propostos ou personas existentes, não comprovam agentes ativos. O formulário usa um endpoint de servidor e armazenamento R2 privado. O assistente usa um roteiro de escolhas; a IA generativa está prevista para ativação posterior, conforme instrução do titular nesta sessão.

## Executar e publicar

1. Node.js 22 ou superior. Executar `npm ci --ignore-scripts`.
2. `node build-portal.mjs` prepara frontend, documentação e Worker autocontido.
3. `npm test` verifica simulações, capacidade e proteção do registo.
4. `node serve.mjs` abre o preview em `http://127.0.0.1:4178`. O preview usa armazenamento de teste em memória e não é o CRM de produção.
5. A publicação Sites conserva a identidade e audiência existentes, usa a pasta de release separada e o Worker compilado. O manifesto declara `r2: "BUCKET"`. Nunca publicar `.env`, leads, tokens ou exports administrativos no GitHub.

## Leads e privacidade

Percursos `member`, `builder`, `investor`, `client`. Campos mínimos: nome, e-mail, mercado, área, intenção, consentimento e confirmação de maioridade. Retenção operacional de 90 dias para pedidos sem relação posterior. O sistema grava prazo por registo e limpa lotes expirados ao receber pedidos. A equipa deve executar limpeza administrativa periódica se não houver tráfego. Renovar a retenção exige finalidade e informação adequadas.

`POST /api/leads` exige mesma origem, JSON, validação dos campos, honeypot e máximo de cinco pedidos por origem de rede/hora. A limitação usa hash com segredo e gravação condicional. Cotas de infraestrutura e alerta de abuso devem ser monitorizados. Nenhum endpoint público lista dados pessoais. O formulário não verifica a posse do e-mail. Confirmar o endereço antes de conceder acessos ou usar dados para decisões.

`GET /api/admin/leads` requer `Authorization: Bearer <GENESIS_ADMIN_TOKEN>`, devolve até 50 registos e cursor. É um segredo de servidor, nunca de frontend. O token está nas variáveis de ambiente do Site e deve ser obtido pela interface administrativa autorizada. Guardar exports apenas no CRM/cofre autorizado. `DELETE /api/admin/leads?key=leads/AAAA-MM-DD/UUID.json` permite atender pedidos de apagamento. Registar a ação no sistema interno sem copiar conteúdo pessoal para logs públicos.

## Ativar Diana com IA real

O ficheiro `worker/ai-adapter.example.js` contém um adaptador compatível com APIs de chat completions. Está desligado e não é importado pelo Worker de produção.

Configurar exclusivamente no servidor:

```text
GENESIS_AI_ENABLED=false
GENESIS_AI_URL=https://PROVEDOR-AUTORIZADO/ENDPOINT-CHAT
GENESIS_AI_KEY=SEGREDO-NO-GESTOR-DE-AMBIENTE
GENESIS_AI_MODEL=MODELO-ESCOLHIDO
GENESIS_AI_DAILY_BUDGET_BRL=10
GENESIS_ADMIN_TOKEN=SEGREDO-ADMINISTRATIVO
```

Antes de ativar:

- Escolher fornecedor, contrato, região, retenção e base de conhecimento aprovada.
- Ligar o adaptador a `/api/chat` com limite de 8 mensagens de contexto e 500 tokens de saída, timeout de 15 segundos e tratamento de falhas.
- Implementar contador atómico persistente de pedidos, tokens e custo por sessão/dia. O valor de orçamento no exemplo é configuração proposta; não está implementado no adaptador. Recusar consumo quando o teto for atingido, incluindo retries.
- Acrescentar limitação de taxa, CAPTCHA apenas quando necessário, observabilidade sem transcrições pessoais e proteção contra automação abusiva.
- Confirmar consentimento para envio da conversa ao fornecedor. Atualizar aviso antes de habilitar.
- Testar perguntas normais, prompt injection, indisponibilidade, orçamento excedido e solicitações de investimento. Respostas renderizadas como texto, nunca HTML do modelo.
- Manter caminhos determinísticos para checkout e matrícula. O modelo não constrói URLs arbitrárias nem confirma pagamento.
- Depois do teste, mudar `GENESIS_AI_ENABLED=true`, publicar e verificar. Voltar a false como rollback.

## Hotmart e Campus

A consulta de ofertas da comunidade 8879672 devolveu HTTP 500 nesta sessão. Por isso o portal usa a página comercial verificada do Atelier e o acesso existente de membros. Não foi inventado um checkout de assinatura. Para ligar a assinatura: consultar oferta e periodicidade reais, copiar o checkout oficial, testar compra autorizada, confirmação, acesso e cancelamento. Só então preencher a configuração pública da comunidade.

Para LearnHouse, preparar um endpoint de webhook autenticado, verificar assinatura segundo o provedor, guardar idempotency key, conciliar produto/oferta/comprador, atribuir entitlement e matrícula server-side. Incluir refund, chargeback, cancelamento e reconciliação periódica. Não conceder acesso pelo redirecionamento do navegador nem por comprovativo enviado em chat. ARO e credenciais existentes permanecem inalterados.

## Pagamentos de participantes e investimentos

Comunidade e formação exigem oferta com escopo, preço, periodicidade, acesso e cancelamento. Colaboração produtiva exige contrato e condições próprias, sem promessa de emprego por pagamento.

O percurso investidor desta versão apenas regista intenção. Ativação de cobrança depende de entidade emissora, instrumento, destinatários e jurisdição definidos, validação jurídica e canal de distribuição aplicável. Uma oferta pública de participação no Brasil pode exigir plataforma registada e observância da Resolução CVM 88 ou outro regime aplicável. Não usar Hotmart, PIXGO ou um boleto voluntário para representar automaticamente quotas. A escolha do meio de pagamento não resolve o enquadramento da oferta.

## Ligar runtimes e conhecimento

Contrato de evento proposto:

```json
{"id":"uuid","source_mode":"observed","tenant_id":"gwd","project_id":"media-pilot","mission_id":"uuid","agent_id":"media-editor","type":"review.completed","timestamp":"ISO-8601","cost_brl":0.12,"artifact_ref":"private-reference","approval_ref":"human-review-id","schema_version":"1.0"}
```

Receber eventos por endpoint autenticado; deduplicar por id; validar tenant e schema; remover dados pessoais e referências privadas antes do espelho público. O segredo do runtime não vai para o navegador. O painel deve mostrar `simulation` ou `observed` por evento, sem misturar fontes. A galáxia pública usa apenas documentos aprovados para divulgação. ACL na recuperação e no armazenamento, nunca apenas no prompt.

Hermes executa tarefas delimitadas. Paperclip é candidato para coordenação. OpenClaw por fronteira de confiança. GBrain exige confirmar o repositório e a implementação AtlasHub antes de definir o conector. O catálogo de agentes deve registrar versão, licença, permissões, custo, avaliação e responsável.

