import { Estudante } from "../models/Estudante.js";
import { validarEstudante } from "../utils/validarEstudante.js";
import type { ResultadoValidacao } from "../types.js";

export class EstudanteService {
  #estudantes: Estudante[] = [];

  cadastrar(entrada: unknown): { readonly estudante: Estudante | null; readonly validacao: ResultadoValidacao } {
    const validacao = validarEstudante(entrada);
    if (!validacao.valido || typeof entrada !== "object" || entrada === null || Array.isArray(entrada)) return { estudante: null, validacao };
    const dados = entrada as { nome: string; matricula: string; curso?: unknown };
    if (this.#estudantes.some((estudante) => estudante.matricula === dados.matricula.trim())) {
      return { estudante: null, validacao: { valido: false, erros: ["Matrícula já cadastrada."] } };
    }
    const curso = typeof dados.curso === "string" && dados.curso.trim() ? dados.curso.trim() : "Não informado";
    const estudante = new Estudante(dados.matricula, dados.nome, curso);
    this.#estudantes.push(estudante);
    return { estudante, validacao };
  }

  buscarPorMatricula(matricula: string): Estudante | null {
    const normalizada = matricula.trim();
    return this.#estudantes.find((estudante) => estudante.matricula === normalizada) ?? null;
  }

  listarTodos(): readonly Estudante[] { return [...this.#estudantes]; }
  calcularMedia(estudante: Estudante): number { return estudante.media; }
}
