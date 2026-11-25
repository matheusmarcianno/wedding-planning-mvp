# Wedding Planning MVP

Landing page responsiva do Cerimonial por Excelência, por Victoria Klein. Apresenta os serviços e mantém o diagnóstico original conectado ao formulário do Tally.

## Objetivo

Apresentar a identidade, os serviços e o processo de trabalho do Cerimonial por Excelência, convertendo interessados em diagnósticos pelo Tally e conversas pelo WhatsApp.

Fluxo principal:

1. Apresentar assessoria de casamentos, celebrações e eventos corporativos.
2. Convidar casais ao diagnóstico gratuito original: `https://tally.so/r/Bz068e`.
3. Explicar o processo, os diferenciais e a região de atendimento.
4. Direcionar outros tipos de evento e dúvidas ao WhatsApp da cerimonialista.

## Features

- Landing page em portugues do Brasil.
- Experiencia mobile-first para trafego vindo de Instagram, WhatsApp, stories e indicacoes.
- Hero com imagem editorial, proposta de valor e CTA para o diagnóstico acima da dobra.
- Seções de diagnóstico, serviços, benefícios, processo, cobertura, dúvidas e CTA final.
- CTAs de casamento para o Tally, preservando parâmetros de campanha da URL atual.
- CTAs de celebrações, eventos corporativos e disponibilidade regional para WhatsApp.
- Imagens editoriais produzidas para o protótipo Stitch e prompt de design em `docs/stitch-prompt.md`.
- SEO com title, meta description, Open Graph, Twitter Card e favicon.
- Camada de analytics sem fornecedor externo para eventos futuros.
- Testes automatizados das secoes, CTAs, comportamento responsivo e analytics.
- Sem backend, banco de dados, autenticacao, painel administrativo ou APIs.

## Stack

- React
- Vite
- TypeScript
- React Router
- Vitest
- React Testing Library
- ESLint
- Prettier

## Como rodar

Instale as dependencias:

```bash
npm install
```

Inicie o servidor local:

```bash
npm run dev
```

Abra o endereco exibido pelo Vite, normalmente:

```text
http://localhost:5173/
```

## Scripts

```bash
npm test       # roda os testes automatizados
npm run lint   # valida regras de lint
npm run build  # gera build de producao em dist/
npm run preview # serve o build localmente
npm audit      # verifica vulnerabilidades conhecidas
```

## Estrutura

```text
src/
  components/
    sections/  # secoes da landing page
    ui/        # componentes reutilizaveis
  constants/   # textos, URLs e dados da landing
  hooks/       # hooks de comportamento e analytics
  pages/       # paginas roteadas
  routes/      # configuracao de rotas
  styles/      # CSS global
  tests/       # testes com Vitest e Testing Library
  types/       # tipos compartilhados
  utils/       # utilitarios, incluindo analytics
```

## Analytics

`src/utils/analytics.ts` prepara uma camada simples, sem dependencia de fornecedor:

- `trackPageView(path?: string)`
- `trackCTA(label: string, location: string)`
- `trackSectionView(sectionId: string)`

Hoje essa camada emite `CustomEvent` no navegador. Uma integracao futura com GA4, Meta Pixel ou outra ferramenta pode ser feita nesse arquivo sem espalhar dependencias pelo app.

## Conteudo e conversao

Os CTAs de diagnóstico e casamento apontam para `https://tally.so/r/Bz068e`. O helper preserva os parâmetros atuais da página, incluindo UTMs. Celebrações, eventos corporativos e consultas de disponibilidade abrem o WhatsApp `+55 47 99647-4116` com mensagem contextual.

O projeto nao publica depoimentos, avaliações, portfolio ou certificações porque esses materiais não foram enviados. Diferenciais e processo vêm das respostas da profissional ao briefing.

## Deploy na Cloudflare Workers

Plataforma recomendada: Cloudflare Workers com assets estaticos via Wrangler.

Motivos:

- Plano gratuito suficiente para um MVP estatico.
- Deploy automatico a partir do GitHub.
- Previews automaticos para pull requests e branches.
- CDN global da Cloudflare.
- Dominio customizado e HTTPS automatico.
- Baixa manutencao, sem backend, containers ou servicos pagos.

Configuracao do projeto:

```text
Build command: npm run deploy
Build output directory: dist
Production branch: main
Root directory: /
```

Fluxo de deploy:

1. Suba o repositorio para o GitHub.
2. No painel da Cloudflare, acesse Workers & Pages.
3. Crie uma aplicacao Workers conectada ao GitHub.
4. Selecione este repositorio.
5. Use as configuracoes acima.
6. Adicione variaveis de ambiente apenas se forem necessarias.
7. Publique o primeiro deploy.

Deploys automaticos:

- Todo push ou merge na branch `main` gera um deploy de producao.
- Pull requests e branches secundarias geram preview deployments.
- Se um build falhar, o ultimo deploy de producao bem-sucedido continua ativo.

Dominio customizado e HTTPS:

1. No projeto da Cloudflare Workers, abra Custom domains.
2. Adicione o dominio principal, por exemplo `www.seudominio.com`.
3. Configure o DNS seguindo as instrucoes da Cloudflare.
4. Aguarde o certificado HTTPS ficar ativo.
5. Teste `https://www.seudominio.com` e o dominio raiz, se configurado.

Variaveis de ambiente:

Este MVP nao precisa de variaveis de ambiente.

Se uma integracao publica for adicionada no futuro, use apenas variaveis com prefixo `VITE_`, como `VITE_ANALYTICS_ID`. Nunca coloque segredos, tokens privados ou chaves de backend em variaveis `VITE_*`, porque elas ficam expostas no JavaScript enviado ao navegador.

Detalhes importantes para Vite:

- O build de producao sai em `dist/`.
- `vite.config.ts` usa `base: '/'`, adequado para Cloudflare Workers e dominios customizados.
- `wrangler.jsonc` usa `not_found_handling: single-page-application`, que garante fallback para `index.html` em rotas do React Router.
- Nao use `public/_redirects` neste projeto, porque o deploy via Workers Assets rejeita esse fallback como um loop.

Teste apos publicar:

- Abra a URL gerada pela Cloudflare.
- Abra o dominio customizado com HTTPS.
- Teste mobile e desktop.
- Clique nos CTAs de casamento e confirme a abertura do formulário Tally com os parâmetros de campanha.
- Clique nos CTAs de outros eventos e confirme a abertura da conversa no WhatsApp.
- Verifique se imagens, favicon, Open Graph e estilos carregam.
- Atualize a pagina em qualquer rota e confirme que nao ha erro 404.
- Abra o console do navegador e confirme que nao ha erros de assets ou JavaScript.

Erros comuns:

- Pagina em branco: confirme que `base` esta como `/`.
- `dist` nao encontrado: confirme que o comando de deploy e `npm run deploy`, que executa o build antes do `wrangler deploy`.
- Variavel `undefined`: use prefixo `VITE_` e redeploy apos alterar variaveis.
- 404 ao atualizar rota: confirme `not_found_handling: single-page-application` em `wrangler.jsonc`.
- Erro de loop em `_redirects`: remova `public/_redirects`, pois o fallback e configurado no `wrangler.jsonc`.
- Problema de dominio/HTTPS: confirme o dominio no Workers, os registros DNS e aguarde propagacao.

## Qualidade

Antes de publicar alteracoes, rode:

```bash
npm test
npm run lint
npm run build
npm audit
```

## Fora de escopo

Este MVP nao inclui backend, banco de dados, autenticacao, painel administrativo, CRM, integracoes de pagamento ou APIs.
