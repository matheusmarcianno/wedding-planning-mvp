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

## Deploy na Vercel

1. Importe o repositorio no painel da Vercel.
2. Use as configuracoes padrao de Vite:
   - Framework Preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
3. Publique o deploy.

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
