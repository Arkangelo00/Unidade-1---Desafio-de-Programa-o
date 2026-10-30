import type { StatusChamado } from "../types.js";
import { validarStatusChamado } from "../utils/validarStatusChamado.js";
import type { Estudante } from "./Estudante.js";

export interface ResumoChamado {
  readonly id: number;
  readonly titulo: string;
  readonly solicitante: string;
  readonly responsavel: string;
  readonly status: StatusChamado;
}

export class Chamado {
  readonly id: number;
  readonly titulo: string;
  readonly solicitante: Estudante;
  responsavel: string | null = null;
  #status: StatusChamado = "ABERTO";

  constructor(id: number, titulo: string, solicitante: Estudante) {
    this.id = id; this.titulo = titulo.trim(); this.solicitante = solicitante;
  }

  get status(): StatusChamado { return this.#status; }

  /** Só permite status pertencentes à união StatusChamado. */
  definirStatus(status: StatusChamado): void {
    if (!validarStatusChamado(status)) throw new Error(`Status inválido: ${String(status)}`);
    if (status === "ABERTO") {
      if (this.#status !== "ABERTO") throw new Error(`Transição inválida para ${status}.`);
      this.#status = status; return;
    }
    if (status === "EM_ATENDIMENTO") { this.atender(this.responsavel ?? "Técnico não identificado"); return; }
    if (status === "FINALIZADO") { this.finalizar(); return; }
    const statusInvalido: never = status;
    throw new Error(`Status não suportado: ${statusInvalido}`);
  }

  atender(tecnico: string): void {
    if (this.#status !== "ABERTO") throw new Error(`Transição inválida. Não é possível atender um chamado com status: ${this.#status}`);
    this.responsavel = tecnico.trim(); this.#status = "EM_ATENDIMENTO";
  }

  finalizar(): void {
    if (this.#status !== "EM_ATENDIMENTO") throw new Error(`Transição inválida. Não é possível finalizar um chamado com status: ${this.#status}`);
    this.#status = "FINALIZADO";
  }

  obterResumo(): ResumoChamado {
    return { id: this.id, titulo: this.titulo, solicitante: this.solicitante.nome, responsavel: this.responsavel ?? "Não atribuído", status: this.#status };
  }
}
