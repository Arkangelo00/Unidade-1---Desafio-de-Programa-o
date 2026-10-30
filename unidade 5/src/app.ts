import { Estudante } from "./models/Estudante.js";
import { Turma } from "./models/Turma.js";
import { Chamado } from "./models/Chamado.js";
import { FilaAtendimento } from "./models/FilaAtendimento.js";

try {
  console.log("=== 1. CRIAÇÃO DE ESTUDANTES E NOTAS ===");
  const aluno1 = new Estudante(
    "2026001",
    "Alice Silva",
    "Sistemas de Informação",
  );
  aluno1.adicionarNota(8.5);
  aluno1.adicionarNota(9.0);

  const aluno2 = new Estudante(
    "2026002",
    "Bruno Costa",
    "Ciência da Computação",
  );
  aluno2.adicionarNota(5.0);
  aluno2.adicionarNota(6.5);

  console.log("Resumo Alice:", aluno1.obterResumo());
  console.log("Resumo Bruno:", aluno2.obterResumo());
  console.log("Notas da Alice (Cópia Segura):", aluno1.listarNotas());

  // Tentativa de burlar a invariante (Irá lançar erro se descomentado)
  // aluno1.adicionarNota(12);

  console.log("\n=== 2. MATRÍCULAS E COMPOSIÇÃO DE TURMA ===");
  const turmaJS = new Turma("POO-JS", "Programação Orientada a Objetos com JS");
  turmaJS.matricularEstudante(aluno1);
  turmaJS.matricularEstudante(aluno2);

  // Tentativa de duplicar matrícula (Irá disparar validação)
  try {
    turmaJS.matricularEstudante(aluno1);
  } catch (err: unknown) {
    const mensagem = err instanceof Error ? err.message : "Erro desconhecido";
    console.log(`[Validação Ativa] Impedido com sucesso: ${mensagem}`);
  }

  console.log("Resumo da Turma:", turmaJS.obterResumo());
  console.log("Lista de Matriculados na Turma:", turmaJS.listarMatriculados());

  console.log("\n=== 3. FLUXO DA FILA DE ATENDIMENTO (FIFO) ===");
  const chamado1 = new Chamado(
    101,
    "Erro de acesso ao Portal Acadêmico",
    aluno1,
  );
  const chamado2 = new Chamado(
    102,
    "Dúvida sobre trancamento de disciplina",
    aluno2,
  );

  const filaDeSuporte = new FilaAtendimento();
  filaDeSuporte.adicionarChamado(chamado1);
  filaDeSuporte.adicionarChamado(chamado2);

  console.log(`Tamanho atual da Fila: ${filaDeSuporte.tamanho}`);
  console.log("Relatório da Fila:", filaDeSuporte.gerarRelatorio());

  console.log("\n--- Processando o primeiro da Fila ---");
  const proximoChamado = filaDeSuporte.retirarProximo();
  if (proximoChamado === null) {
    console.log("A fila está vazia.");
  } else {
    console.log(`Chamado retirado ID: ${proximoChamado.id} (${proximoChamado.titulo})`);

  // Alteração controlada do Ciclo de Vida do Chamado
  proximoChamado.atender("Técnico Carlos");
  console.log("Estado durante o atendimento:", proximoChamado.obterResumo());

  proximoChamado.finalizar();
  console.log("Estado após finalização:", proximoChamado.obterResumo());
  }

  console.log(`\nTamanho final da Fila: ${filaDeSuporte.tamanho}`);
  console.log("Relatório da Fila Atualizado:", filaDeSuporte.gerarRelatorio());
} catch (error: unknown) {
  console.error("Erro inesperado no sistema:", error instanceof Error ? error.message : "Erro desconhecido");
}
