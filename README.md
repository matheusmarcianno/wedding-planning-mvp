# Wedding Planning MVP

Landing page mobile-first para validar uma ideia de negocio de planejamento de casamento no Brasil.

O projeto direciona casais para um diagnostico gratuito no Tally, com foco em gerar leads qualificados para profissionais de planejamento e cerimonial.

## Objetivo

Validar a hipotese de que casais que completam um diagnostico estruturado geram leads mais qualificados para wedding planners.

Fluxo principal:

1. Atrair casais planejando casamento.
2. Explicar o valor do diagnostico.
3. Incentivar o preenchimento do formulario.
4. Redirecionar para o Tally: https://tally.so/r/Bz068e

## Features

- Landing page em portugues do Brasil.
- Experiencia mobile-first para trafego vindo de Instagram, WhatsApp, stories e indicacoes.
- Hero com imagem de casamento, proposta de valor e CTA acima da dobra.
- Secoes de beneficios, funcionamento, confianca e CTA final.
- CTA sticky no mobile apontando para o formulario do Tally.
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

Todos os CTAs principais apontam para:

```text
https://tally.so/r/Bz068e
```

O projeto nao cria depoimentos, reviews ou promessas falsas. A secao de confianca usa apenas texto institucional sobre apoio de profissionais do mercado de eventos.

## Deploy na Cloudflare Pages

Plataforma recomendada: Cloudflare Pages.

Motivos:

- Plano gratuito suficiente para um MVP estatico.
- Deploy automatico a partir do GitHub.
- Previews automaticos para pull requests e branches.
- CDN global da Cloudflare.
- Dominio customizado e HTTPS automatico.
- Baixa manutencao, sem backend, containers ou servicos pagos.

Configuracao do projeto:

```text
Framework preset: React (Vite)
Build command: npm run build
Build output directory: dist
Production branch: main
Root directory: /
```

Fluxo de deploy:

1. Suba o repositorio para o GitHub.
2. No painel da Cloudflare, acesse Workers & Pages.
3. Crie uma aplicacao Pages conectada ao GitHub.
4. Selecione este repositorio.
5. Use as configuracoes acima.
6. Adicione variaveis de ambiente apenas se forem necessarias.
7. Publique o primeiro deploy.

Deploys automaticos:

- Todo push ou merge na branch `main` gera um deploy de producao.
- Pull requests e branches secundarias geram preview deployments.
- Se um build falhar, o ultimo deploy de producao bem-sucedido continua ativo.

Dominio customizado e HTTPS:

1. No projeto da Cloudflare Pages, abra Custom domains.
2. Adicione o dominio principal, por exemplo `www.seudominio.com`.
3. Configure o DNS seguindo as instrucoes da Cloudflare.
4. Aguarde o certificado HTTPS ficar ativo.
5. Teste `https://www.seudominio.com` e o dominio raiz, se configurado.

Variaveis de ambiente:

Este MVP nao precisa de variaveis de ambiente.

Se uma integracao publica for adicionada no futuro, use apenas variaveis com prefixo `VITE_`, como `VITE_ANALYTICS_ID`. Nunca coloque segredos, tokens privados ou chaves de backend em variaveis `VITE_*`, porque elas ficam expostas no JavaScript enviado ao navegador.

Detalhes importantes para Vite:

- O build de producao sai em `dist/`.
- `vite.config.ts` usa `base: '/'`, adequado para Cloudflare Pages e dominios customizados.
- `public/_redirects` garante fallback para `index.html` em rotas do React Router.

Teste apos publicar:

- Abra a URL `*.pages.dev`.
- Abra o dominio customizado com HTTPS.
- Teste mobile e desktop.
- Clique nos CTAs e confirme o redirecionamento para o Tally.
- Verifique se imagens, favicon, Open Graph e estilos carregam.
- Atualize a pagina em qualquer rota e confirme que nao ha erro 404.
- Abra o console do navegador e confirme que nao ha erros de assets ou JavaScript.

Erros comuns:

- Pagina em branco: confirme que `base` esta como `/`.
- `dist` nao encontrado: confirme que o build command e `npm run build`.
- Variavel `undefined`: use prefixo `VITE_` e redeploy apos alterar variaveis.
- 404 ao atualizar rota: confirme que `public/_redirects` foi publicado.
- Problema de dominio/HTTPS: confirme o dominio no Pages, os registros DNS e aguarde propagacao.

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
