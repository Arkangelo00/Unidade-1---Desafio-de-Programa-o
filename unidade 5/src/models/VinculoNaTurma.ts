import type { Estudante } from "./Estudante.js";

export interface DadosVinculo { readonly matricula: string; readonly nome: string; readonly dataEntrada: string; readonly frequencia: string; }

export class VinculoNaTurma {
  readonly estudante: Estudante;
  readonly dataEntrada: Date;
  #frequencia = 100;
  constructor(estudante: Estudante) { this.estudante = estudante; this.dataEntrada = new Date(); }
  get frequencia(): number { return this.#frequencia; }
  set frequencia(novaFrequencia: number) {
    if (!Number.isFinite(novaFrequencia) || novaFrequencia < 0 || novaFrequencia > 100) throw new Error("A frequência deve estar entre 0% e 100%.");
    this.#frequencia = novaFrequencia;
  }
  obterDadosVinculo(): DadosVinculo { return { matricula: this.estudante.matricula, nome: this.estudante.nome, dataEntrada: this.dataEntrada.toLocaleDateString("pt-BR"), frequencia: `${this.#frequencia}%` }; }
}
