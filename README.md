# Genesis × GWD — Fundação AI-Native

Versão 0.3 · 5 de novembro de 2026.

[Portal público](https://atlashub-genesis.nexflowx-tech.chatgpt.site/) · [Business plan](https://atlashub-genesis.nexflowx-tech.chatgpt.site/documentacao) · [Documentação Genesis](https://github.com/AtlasHub-Si/Projeto-Genesis)

A AtlasHub constrói a tecnologia; a GWD é a operação piloto proposta. Demonstração navegável: campus 3D original, galáxia de conhecimento, organograma, 18 verticais, simulador económico, missão com aprovação humana e formulário de interesse com armazenamento privado no servidor.

**Estado real:** campus e missões são simulações com dados sintéticos. Hermes, GBrain e agentes departamentais não estão ligados a serviços reais. Diana é um percurso guiado, com adaptador de IA futura documentado. O formulário não efetua cobrança, matrícula, seleção profissional ou investimento.

## Executar

Requer Node.js 22+ e npm.

```sh
npm ci --ignore-scripts
npm run build
npm test
npm start
```

Abrir http://127.0.0.1:4178. O ambiente local usa armazenamento temporário em memória e uma chave de teste. Nunca usar esse servidor para recolher contactos reais.

A construção obtém a ilustração AtlasHub do portal publicado quando ela não está em `dist/assets/genesis-campus.png`. O 3D é gerado por código com Three.js. As bibliotecas são copiadas para `dist/vendor/` no build, preservando a licença de origem.

## Publicar e operar

O build produz `build/server/index.js` (Cloudflare Worker ESM com recursos incorporados) e `build/.openai/hosting.json`. O identificador corresponde ao portal AtlasHub existente: usar outro identificador num novo ambiente. Associar R2 como `BUCKET` e definir `GENESIS_ADMIN_TOKEN` como segredo de servidor. Nunca colocar segredos no Git ou no navegador.

As instruções de consulta administrativa, retenção, integração de IA, Hotmart e entitlements estão no [runbook](docs/INTEGRATION-RUNBOOK.md).

## Documentos principais

- [Plano de negócio, ofertas e 90 dias](docs/GWD-BUSINESS-PLAN.md)
- [Modelo financeiro calculável](data/gwd-model.json)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Governança](docs/GOVERNANCE.md)
- [Participação](docs/PARTICIPATION.md)
- [Pesquisa e fontes](docs/RESEARCH-2026-11.md)
- [Operação e integração](docs/INTEGRATION-RUNBOOK.md)
- [Catálogo conceptual de agentes](data/agent-pack.json)
- [Contrato de auditoria da simulação](data/demo-audit.schema.json)

Dez testes verificam os motores de cálculo e decisão, a validação do formulário, a recusa de origem externa e o acesso administrativo. Custos, volumes, preços B2B e assinatura são hipóteses internas; não são cotações, contratos ou resultados de clientes.

## Participação

Comunidade, colaboração, serviços e investimento têm percursos próprios. A assinatura AtlasClub não confere quotas. Investimento regista apenas interesse; uma oferta exige entidade, instrumento e canal adequados. Conservar 51% do capital e votos do fundador é objetivo de estrutura, não direito formalizado pelo portal.

Não foram alterados ARO, credenciais existentes, domínio GoWorld.Digital ou infraestrutura de produção dos agentes.

