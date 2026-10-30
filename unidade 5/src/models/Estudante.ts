import { CONFIG_ACADEMICA } from "../config/configuracao.js";

export type SituacaoAprovacao = "Aprovado" | "Em recuperação";

export interface ResumoEstudante {
  readonly matricula: string;
  readonly nome: string;
  readonly curso: string;
  readonly media: number;
  readonly statusAprovacao: SituacaoAprovacao;
}

export class Estudante {
  readonly matricula: string;
  nome: string;
  curso: string;
  ativo: boolean;
  #notas: number[] = [];

  constructor(matricula: string, nome: string, curso: string, ativo = true) {
    this.matricula = matricula.trim();
    this.nome = nome.trim();
    this.curso = curso.trim();
    this.ativo = ativo;
  }

  adicionarNota(nota: number): void {
    if (!Number.isFinite(nota) || nota < CONFIG_ACADEMICA.NOTA_MINIMA || nota > CONFIG_ACADEMICA.NOTA_MAXIMA) {
      throw new Error(`Nota inválida: ${nota}. A nota deve estar entre ${CONFIG_ACADEMICA.NOTA_MINIMA} e ${CONFIG_ACADEMICA.NOTA_MAXIMA}.`);
    }
    this.#notas.push(nota);
  }

  get media(): number {
    if (this.#notas.length === 0) return 0;
    const soma = this.#notas.reduce((acc, curr) => acc + curr, 0);
    return Number((soma / this.#notas.length).toFixed(2));
  }

  listarNotas(): readonly number[] { return [...this.#notas]; }

  obterResumo(): ResumoEstudante {
    return { matricula: this.matricula, nome: this.nome, curso: this.curso, media: this.media, statusAprovacao: this.media >= CONFIG_ACADEMICA.MEDIA_MINIMA_APROVACAO ? "Aprovado" : "Em recuperação" };
  }
}
