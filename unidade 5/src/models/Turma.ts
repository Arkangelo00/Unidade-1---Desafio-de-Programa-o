import { VinculoNaTurma } from "./VinculoNaTurma.js";
import type { Estudante } from "./Estudante.js";

export interface ResumoTurma { readonly codigo: string; readonly componenteCurricular: string; readonly totalAlunos: number; }

export class Turma {
  readonly codigo: string;
  componenteCurricular: string;
  #vinculos: VinculoNaTurma[] = [];

  constructor(codigo: string, componenteCurricular: string) { this.codigo = codigo.trim(); this.componenteCurricular = componenteCurricular.trim(); }

  matricularEstudante(estudante: Estudante): void {
    const jaMatriculado = this.#vinculos.some((vinculo) => vinculo.estudante.matricula === estudante.matricula);
    if (jaMatriculado) throw new Error(`Estudante com matrícula ${estudante.matricula} já está matriculado nesta turma.`);
    this.#vinculos.push(new VinculoNaTurma(estudante));
  }

  listarMatriculados(): ReturnType<VinculoNaTurma["obterDadosVinculo"]>[] { return this.#vinculos.map((vinculo) => vinculo.obterDadosVinculo()); }
  obterResumo(): ResumoTurma { return { codigo: this.codigo, componenteCurricular: this.componenteCurricular, totalAlunos: this.#vinculos.length }; }
}
