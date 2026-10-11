import { CONFIG_ACADEMICA } from "../config/configuracao.js";

export class Estudante {
  // Atributos públicos estáveis
  matricula;
  nome;
  curso;

  // Atributo privado encapsulado
  #notas = [];

  constructor(matricula, nome, curso) {
    this.matricula = matricula;
    this.nome = nome;
    this.curso = curso;
  }

  // Valida a invariante da nota (0 a 10) antes de inserir
  adicionarNota(nota) {
    if (
      typeof nota !== "number" ||
      (nota < CONFIG_ACADEMICA.NOTE_MINIMA &&
        nota < CONFIG_ACADEMICA.NOTA_MINIMA) ||
      nota > CONFIG_ACADEMICA.NOTA_MAXIMA
    ) {
      throw new Error(
        `Nota inválida: ${nota}. A nota deve estar entre ${CONFIG_ACADEMICA.NOTA_MINIMA} e ${CONFIG_ACADEMICA.NOTA_MAXIMA}.`,
      );
    }
    this.#notas.push(nota);
  }

  // Getter que calcula a média sob demanda evitando estado derivado desatualizado
  get media() {
    if (this.#notas.length === 0) return 0;
    const soma = this.#notas.reduce((acc, curr) => acc + curr, 0);
    return Number((soma / this.#notas.length).toFixed(2));
  }

  // Retorna uma cópia segura para não expor a referência do array privado original
  listarNotas() {
    return [...this.#notas];
  }

  obterResumo() {
    return {
      matricula: this.matricula,
      nome: this.nome,
      curso: this.curso,
      media: this.media,
      statusAprovacao:
        this.media >= CONFIG_ACADEMICA.MEDIA_MINIMA_APROVACAO
          ? "Aprovado"
          : "Em recuperação",
    };
  }
}
