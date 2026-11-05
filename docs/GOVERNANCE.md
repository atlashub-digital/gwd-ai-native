# Genesis · Governança e autoridade humana

**Estado:** proposta para deliberação e revisão societária. A demo simula decisões, orçamento e execução. Uma aprovação no navegador da demo não tem efeito empresarial.

## 1. Três planos de autoridade

| Plano | Quem participa | Efeito |
|---|---|---|
| Capital e votos societários | Pessoas e entidades admitidas pelos instrumentos da sociedade | Manter pelo menos 51% do capital e dos votos nas mãos do fundador é objetivo de desenho, sujeito a validação e formalização. O contrato e a lei aplicável regem poderes, quórum e matérias reservadas |
| Mesa consultiva Genesis | Em proposta, quatro cadeiras humanas e quatro cadeiras de agentes. Diana é a secretaria técnica | As oito cadeiras emitem posições na simulação. Pareceres de IA entram na análise sem direito a voto societário, representação ou assinatura |
| Autoridade executiva e operacional | Administradores e responsáveis humanos identificados, conforme entidade, função e mandato | Autoriza o efeito por ação e por valor. O control plane e a autoridade de domínio verificam a autorização antes da execução |

Assim, a proporção **50% humana na Mesa consultiva** e a meta **51% do fundador no capital e nos votos da sociedade** medem coisas diferentes. A decisão final permanece com as pessoas autorizadas. O modelo do Brasil deve ser validado contra o Código Civil, os atos societários e as regras do veículo escolhido. Direitos, quóruns e diluição precisam de simulação específica para cada estrutura e rodada. [Código Civil brasileiro, arts. 1.060 a 1.087](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm)

**Mesa proposta.** Humanos com mandatos explícitos para estratégia, finanças, tecnologia/segurança e operação/compliance. Cadeiras consultivas de IA para estratégia, cenários financeiros, viabilidade técnica e riscos operacionais. Cada cadeira publica uma posição com evidências, incertezas e uma alternativa. O proponente identifica conflitos de interesse. Quórum e elegibilidade humana seguem a política da entidade. Empate, divergência relevante, ausência de quórum ou veto suspendem a execução e retornam a proposta para revisão. Um voto humano favorável no painel, por si só, não substitui os quóruns, a segregação ou o mandato exigidos.

## 2. Como uma decisão fica autorizada

1. **Proposta.** A unidade preenche propósito, entidade, categoria, montante, alvo, fornecedores, dados envolvidos, janela, critérios de aceite, condições de pausa e plano de compensação.
2. **Pareceres.** O Hermes encaminha um pacote sanitizado. Cada agente aponta fontes e limitações. Um revisor independente verifica os cálculos, o destino e a conformidade com a política.
3. **Aprovação.** A interface autentica o decisor e mostra os efeitos concretos. O servidor verifica papel, entidade, limite, conflitos, validade e quórum. Para ações materiais, proponente, aprovador e executor são segregados.
4. **Execução.** O gateway exige um identificador de aprovação, hash da proposta, ação, teto, identidade técnica, janela e chave idempotente. Mudança relevante gera nova proposta. O sistema titular pode negar o comando mesmo com aprovação.
5. **Verificação.** O rastro liga proposta, pareceres, assinaturas, reserva, execução, resultado e custo. Divergências viram incidente ou nova missão.

| Classe | Exemplo | Regra de execução proposta |
|---|---|---|
| A0 · leitura autorizada | Pesquisa em catálogo público ou consulta de documento interno permitido | Automática com ACL, quota e log |
| A1 · escrita interna reversível | Rascunho, classificação, relatório sintético | Automática com quota, destino permitido e opção de reversão |
| A2 · comunicação externa | Mensagem a um lead, publicação orgânica, envio de campanha | Aprovação humana no piloto, com finalidade, texto, público e canal definidos |
| A3 · efeito comercial/financeiro | Compra de estoque, preço, cobrança, devolução, verba de mídia | Aprovação de responsável humano e, acima dos limites ratificados, revisão financeira adicional. Reserva e reconciliação |
| A4 · infraestrutura ou acesso crítico | Produção, migração, IAM, credenciais, exposição, dados restritos | Aprovação explícita da Engenharia e do responsável pela segurança/dados conforme a mudança, plano de rollback e janela |
| Matéria societária | Aumento de capital, constituição de filial, emissão de quotas, alteração de poderes | Decisão humana formal do órgão competente. A demo pode guardar apenas a referência da ata |

**Cortes de segurança.** Um agente não cria ou aprova o próprio mandato. Ferramentas reavaliam permissões por chamada. Nenhum agente recebe chave mestre, sessão pessoal ou cartão. O responsável pode pausar uma missão, um agente, uma unidade, uma categoria de ação ou o ambiente. Qualquer execução bloqueada deve indicar o motivo e a próxima responsabilidade humana.

## 3. Responsáveis e rotina

| Processo | Responsável final | Consulta e verificação |
|---|---|---|
| Priorizar portfólio e aprovar investimento | Direção humana competente | Mesa, finanças e responsável da unidade |
| Admitir unidade, fornecedor ou cliente | Direção local e gestor do contrato | Jurídico, segurança, titular de dados e operações |
| Aprovar mudança de modelo, skill ou acesso | Dono técnico humano | Segurança e responsável pela atividade |
| Liberar gasto e reconciliar | Financeiro humano com mandato | Unidade e controle interno |
| Encerrar incidente e retomar | Líder de incidente humano | Engenharia, segurança, jurídico quando aplicável |

Cadência proposta. A unidade revê fila, falhas e custo diariamente. A direção e os centros revêm qualidade, contribuição e capacidade semanalmente. A Mesa revê portfólio e risco mensalmente. Uma ata associa proposta, evidências, conflitos, quórum, condições, donos e prazos. O Notion pode gerir a pauta, enquanto a decisão executável fica na trilha de aprovação e os instrumentos formais permanecem no repositório jurídico autorizado.

## 4. Pessoas, parceiros e captação

| Porta de entrada | Oferta de hoje | Documentação e decisão |
|---|---|---|
| AtlasClub | Aprendizagem, laboratórios sintéticos e revisão de projetos. Convite para conhecer o Genesis | Conteúdo educacional no Club. Nenhum dado do membro vai para diligência por omissão |
| Candidato a colaborar | Manifestação de interesse, seleção e projetos delimitados | Identidade e dados mínimos. Formalizar contrato, remuneração ou enquadramento da colaboração antes de iniciar trabalho |
| Prestador ou cliente piloto | Avaliação de capacidades e contrato de serviço por unidade | SLA, titularidade, permissões e responsabilidade. Separação de dados entre clientes |
| Potencial investidor | Data room por convite com documentos preparatórios e demonstração de tecnologia | Registar apenas interesse, com finalidade clara. Qualquer abordagem que possa constituir oferta depende de revisão da jurisdição, veículo e canal |

A ligação da comunidade ao Genesis pode começar por uma apresentação técnica, uma sessão aberta sobre a demo e uma página de interesse **sem recebimento de dinheiro**. A subscrição do AtlasClub dá acesso aos benefícios de aprendizagem da respetiva oferta. O fluxo de equity exige decisão societária, instrumento e trilha próprios. Para crowdfunding de investimento sob o regime brasileiro da Resolução CVM 88, a oferta é distribuída por plataforma eletrônica registada na CVM. Confirmar a regra em vigor, a elegibilidade do veículo e as condições de divulgação antes de lançar captação pública. [CVM · Registro de plataforma](https://www.gov.br/pt-br/servicos/registrar-plataforma-eletronica-de-investimento-participativo-cvm-crowdfunding) · [Resolução CVM 88](https://conteudo.cvm.gov.br/legislacao/resolucoes/resol088.html)

### Sala de diligência

- **Divulgação técnica**. Visão, organograma conceptual, workflow sintético, demonstração, ADRs selecionados e política de autoridade humana.
- **Revisão controlada**. Entidade e organograma atualizados, cap table atual e diluída, documentos de constituição, propriedade intelectual, plano de uso de fundos, orçamento por cenário e hipóteses, contratos materiais, riscos e indicadores.
- **Restrito**. Dados pessoais, contratos detalhados, dados de clientes, versões internas, logs ou amostras. Cada partilha tem dono, classe, expiração e trilha. Limitar dados ao necessário e remover segredos.
- **Instruções da oferta**. Só após formalização, revisão profissional e validação do canal. Guardar versão autorizada, responsável, instrumento, termos e trilha de aprovação.

## 5. Gate de passagem a piloto

| Evidência | Quem ratifica |
|---|---|
| Responsável humano, entidade e dados permitidos definidos para a missão | Unidade e segurança |
| Testes positivos e negativos de escopo, recusa, expiração e concorrência | Engenharia e QA |
| Limite de gasto, reserva atômica, reconciliação e alertas | Financeiro |
| Rollback ensaiado, retorno seguro e escalonamento humano | Operações e Engenharia |
| Evidências redigidas, fontes verificadas e documentação por versão | Responsável pela documentação e segurança |

Em produção, as classes A2 a A4 ficam bloqueadas até os controlos aplicáveis serem demonstrados no ambiente alvo. Alterações a limites e papéis exigem revisão de política e versão, além da prova de que os acessos antigos foram revogados.

