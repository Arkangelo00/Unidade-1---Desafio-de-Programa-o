export class Chamado {
  id;
  titulo;
  solicitante; // Associação com objeto Estudante
  responsavel; // Atendente/Técnico opcional

  // Controle de estado privado
  #status;

  constructor(id, titulo, solicitante) {
    this.id = id;
    this.titulo = titulo;
    this.solicitante = solicitante;
    this.responsavel = null;
    this.#status = "ABERTO";
  }

  get status() {
    return this.#status;
  }

  // Máquina de estados controlada: ABERTO -> EM_ATENDIMENTO
  atender(tecnico) {
    if (this.#status !== "ABERTO") {
      throw new Error(
        `Transição inválida. Não é possível atender um chamado com status: ${this.#status}`,
      );
    }
    this.responsavel = tecnico;
    this.#status = "EM_ATENDIMENTO";
  }

  // Máquina de estados controlada: EM_ATENDIMENTO -> FINALIZADO
  finalizar() {
    if (this.#status !== "EM_ATENDIMENTO") {
      throw new Error(
        `Transição inválida. Não é possível finalizar um chamado com status: ${this.#status}`,
      );
    }
    this.#status = "FINALIZADO";
  }

  obterResumo() {
    return {
      id: this.id,
      titulo: this.titulo,
      solicitante: this.solicitante.nome,
      responsavel: this.responsavel || "Não atribuído",
      status: this.#status,
    };
  }
}
