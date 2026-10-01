import { AlunoRepository } from "./repositories/AlunoRepository.js";
import {
  gerarRelatorio,
  criarFiltro,
  Formatadores,
} from "./services/RelatorioService.js";

const repo = new AlunoRepository();

console.log("=== CADASTRANDO ALUNOS ===");

const alunosParaCadastrar = [
  { matricula: " 2023001 ", nome: "  Ana Silva ", email: "ana@email.com", curso: "Análise e Dev", notas: [8, 9, 7.5] },
  { matricula: "2023002", nome: "Bruno Costa", email: "bruno@email.com", curso: "Análise e Dev", notas: [4, 5, 3] },
  { matricula: "2023003", nome: "Carla Souza", email: "carla@email.com", curso: "Redes de Computadores", notas: [10, 9.5, 9] },
  { matricula: "2023004", nome: "Daniel Rocha", email: "daniel@email.com", curso: "Redes de Computadores", notas: [5, 4, 6] },
  { matricula: "2023005", nome: "Eduarda Lima", email: "eduarda@email.com", curso: "Análise e Dev", notas: [] },
];

alunosParaCadastrar.forEach((aluno) => {
  try {
    repo.cadastrar(aluno);
  } catch (err) {
    console.error(`Erro ao cadastrar ${aluno.nome}:`, err.message);
  }
});

console.log("\n=== TESTANDO VALIDAÇÕES E ERROS ===");
try {
  repo.cadastrar({ matricula: "2023001", nome: "Teste Duplicado", email: "t@e.com", curso: "ADS", notas: [7] });
} catch (e) {
  console.log("✔ Rejeitou Matrícula Duplicada:", e.message);
}

try {
  repo.cadastrar({ matricula: "2023099", nome: "Al", email: "al@email.com", curso: "ADS", notas: [7] });
} catch (e) {
  console.log("✔ Rejeitou Nome Curto:", e.message);
}

try {
  repo.cadastrar({ matricula: "2023098", nome: "Aluno Erro", email: "emailinvalido", curso: "ADS", notas: [7] });
} catch (e) {
  console.log("✔ Rejeitou E-mail Inválido:", e.message);
}

try {
  repo.cadastrar({ matricula: "2023097", nome: "Nota Alta", email: "nota@e.com", curso: "ADS", notas: [12] });
} catch (e) {
  console.log("✔ Rejeitou Nota Fora do Intervalo:", e.message);
}

const todosAlunos = repo.listarTodos();

console.log("\n==================================================");
console.log("RELATÓRIO 1: Aprovados Ordenados por Nome");
console.log("==================================================");
const relatorio1 = gerarRelatorio(
  todosAlunos,
  (aluno) => aluno.situacao === "Aprovado",
  Formatadores.aprovadosPorNome,
  (a, b) => a.nome.localeCompare(b.nome),
  6
);
console.log(relatorio1);

console.log("\n==================================================");
console.log("RELATÓRIO 2: Reprovados (Menor para Maior Média)");
console.log("==================================================");
const relatorio2 = gerarRelatorio(
  todosAlunos,
  (aluno) => aluno.situacao === "Reprovado",
  Formatadores.reprovados,
  (a, b) => a.media - b.media,
  6
);
console.log(relatorio2);

console.log("\n==================================================");
console.log("RELATÓRIO 3: Alunos do curso 'Análise e Dev' em CSV (Usando Closure)");
console.log("==================================================");
const filtroCurso = criarFiltro("curso", "Análise e Dev");
const relatorio3 = gerarRelatorio(
  todosAlunos,
  filtroCurso,
  Formatadores.csv
);
console.log(relatorio3);

console.log("\n==================================================");
console.log("RELATÓRIO 4: Resumo por Curso (Qtd e Média Geral)");
console.log("==================================================");
const relatorio4 = gerarRelatorio(
  todosAlunos,
  null,
  Formatadores.resumoPorCurso
);
console.log(relatorio4);

console.log("\n==================================================");
console.log("TESTE DE TRATAMENTO DE BORDAS E BUSCA/REMOÇÃO");
console.log("==================================================");
console.log("Removendo matrícula 2023001...", repo.removerPorMatricula("2023001") ? "Sucesso" : "Falha");

const filtroCursoInexistente = criarFiltro("curso", "Curso Que Nao Existe");
const relatorioVazio = gerarRelatorio(
  todosAlunos,
  filtroCursoInexistente,
  Formatadores.csv
);
console.log("Filtro sem resultados:", relatorioVazio);

const relatorioColecaoVazia = gerarRelatorio([], null, Formatadores.csv);
console.log("Coleção vazia:", relatorioColecaoVazia);
