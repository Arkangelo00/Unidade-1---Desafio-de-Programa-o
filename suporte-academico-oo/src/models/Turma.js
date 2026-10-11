import { VinculoNaTurma } from "./VinculoNaTurma.js";

export class Turma {
  codigo;
  componenteCurricular;

  // Coleção privada de vínculos (Composição)
  #vinculos = [];

  constructor(codigo, componenteCurricular) {
    this.codigo = codigo;
    this.componenteCurricular = componenteCurricular;
  }

  // A turma cria e controla o ciclo de vida de VinculoNaTurma (Composição)
  matricularEstudante(estudante) {
    const jaMatriculado = this.#vinculos.some(
      (v) => v.estudante.matricula === estudante.matricula,
    );
    if (jaMatriculado) {
      throw new Error(
        `Estudante com matrícula ${estudante.matricula} já está matriculado nesta turma.`,
      );
    }

    const novoVinculo = new VinculoNaTurma(estudante);
    this.#vinculos.push(novoVinculo);
  }

  // Retorna uma projeção de dados segura, sem vazar os objetos originais de vínculos internos
  listarMatriculados() {
    return this.#vinculos.map((vinculo) => vinculo.obterDadosVinculo());
  }

  obterResumo() {
    return {
      codigo: this.codigo,
      componenteCurricular: this.componenteCurricular,
      totalAlunos: this.#vinculos.length,
    };
  }
}
