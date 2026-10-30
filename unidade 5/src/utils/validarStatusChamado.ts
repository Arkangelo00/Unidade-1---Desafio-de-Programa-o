import type { StatusChamado } from "../types.js";

const STATUS_VALIDOS: readonly StatusChamado[] = ["ABERTO", "EM_ATENDIMENTO", "FINALIZADO"];

/** Valida valores recebidos de APIs, formulários ou JSON em tempo de execução. */
export function validarStatusChamado(valor: unknown): valor is StatusChamado {
  return typeof valor === "string" && STATUS_VALIDOS.some((status) => status === valor);
}
