import type { DadosEstudanteEntrada, ResultadoValidacao } from "../types.js";

/** Converte entrada não confiável em dados validados sem recorrer a any. */
export function validarEstudante(entrada: unknown): ResultadoValidacao {
  const erros: string[] = [];
  if (typeof entrada !== "object" || entrada === null || Array.isArray(entrada)) {
    return { valido: false, erros: ["A entrada deve ser um objeto."] };
  }
  const dados = entrada as DadosEstudanteEntrada;
  if (typeof dados.nome !== "string" || dados.nome.trim().length < 2) erros.push("Nome é obrigatório e deve ter pelo menos 2 caracteres.");
  if (typeof dados.matricula !== "string" || !/^\d{7}$/.test(dados.matricula.trim())) erros.push("Matrícula é obrigatória e deve conter exatamente 7 dígitos.");
  if (dados.curso !== undefined && (typeof dados.curso !== "string" || dados.curso.trim().length === 0)) erros.push("Curso, quando informado, deve ser um texto não vazio.");
  return { valido: erros.length === 0, erros };
}
