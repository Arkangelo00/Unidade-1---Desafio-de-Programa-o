/** Estados permitidos no ciclo de vida de um chamado. */
export type StatusChamado = "ABERTO" | "EM_ATENDIMENTO" | "FINALIZADO";

/** Modelo público e estável de um estudante cadastrado. */
export interface EstudanteDados {
  readonly matricula: string;
  nome: string;
  curso: string;
  ativo: boolean;
}

export type DadosEstudanteEntrada = {
  readonly nome?: unknown;
  readonly matricula?: unknown;
  readonly curso?: unknown;
};

export interface ResultadoValidacao {
  readonly valido: boolean;
  readonly erros: string[];
}
