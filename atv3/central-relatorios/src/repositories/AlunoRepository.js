import { Aluno } from "../models/Aluno.js";

export class AlunoRepository {
  #alunos = [];
  #proximoId = 1;

  cadastrar(dadosAluno) {
    const matriculaExistente = this.#alunos.some(
      (a) => a.matricula === dadosAluno.matricula?.trim()
    );

    if (matriculaExistente) {
      throw new Error(`Matrícula '${dadosAluno.matricula}' já está cadastrada.`);
    }

    const aluno = new Aluno({ ...dadosAluno, id: this.#proximoId++ });
    this.#alunos.push(aluno);
    return this.obterPorMatricula(aluno.matricula);
  }

  listarTodos() {
    return this.#alunos.map((aluno) => ({
      ...aluno,
      notas: [...aluno.notas],
    }));
  }

  obterPorMatricula(matricula) {
    const aluno = this.#alunos.find((a) => a.matricula === matricula?.trim());
    if (!aluno) return null;
    
    return {
      ...aluno,
      notas: [...aluno.notas],
    };
  }

  removerPorMatricula(matricula) {
    const index = this.#alunos.findIndex((a) => a.matricula === matricula?.trim());
    if (index === -1) {
      return false;
    }
    this.#alunos.splice(index, 1);
    return true;
  }
}
