# Suporte Acadêmico — TypeScript estrito

Migração do projeto modular para TypeScript com verificações estáticas.

## Requisitos
- Node.js 20+ recomendado
- npm

## Instalação e execução
```bash
npm install
npm run typecheck
npm start
```

`npm run typecheck` executa `tsc --noEmit`, verificando os tipos sem gerar arquivos. `npm start` compila para `dist/` e executa a aplicação. `npm run dev` executa os fontes com `tsx`.

## O que a migração demonstra
- `strict`, `noImplicitAny` e `strictNullChecks` habilitados.
- Tipos explícitos para estudantes, turmas, vínculos, chamados e estados de chamados.
- `StatusChamado` restringe os estados a `ABERTO`, `EM_ATENDIMENTO` ou `FINALIZADO`.
- `unknown` é usado para entradas externas e estreitado antes do uso.
- Busca e remoção distinguem ausência de resultado por `null`/`boolean`.
- Campos imutáveis são `readonly`; ausência de dados é expressa com tipos opcionais ou união com `null`.

## Por que tipos previnem defeitos antes da execução?
O compilador detecta usos incompatíveis — como passar um status inexistente, usar um resultado possivelmente nulo sem verificá-lo ou chamar métodos em valores de tipo desconhecido — antes que o programa rode. A validação de tipos não substitui validações de dados em tempo de execução: dados externos continuam sendo validados explicitamente.
