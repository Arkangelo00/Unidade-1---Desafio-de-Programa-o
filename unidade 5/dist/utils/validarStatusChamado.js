const STATUS_VALIDOS = ["ABERTO", "EM_ATENDIMENTO", "FINALIZADO"];
/** Valida valores recebidos de APIs, formulários ou JSON em tempo de execução. */
export function validarStatusChamado(valor) {
    return typeof valor === "string" && STATUS_VALIDOS.some((status) => status === valor);
}
