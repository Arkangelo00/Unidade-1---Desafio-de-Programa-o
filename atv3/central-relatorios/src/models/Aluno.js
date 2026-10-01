import { validarAluno } from "../utils/validacoes.js";

export class Aluno {
  constructor({ id, matricula, nome, email, curso, notas = [] }) {
    const dadosNormalizados = validarAluno({ nome, email, curso, matricula, notas });

    this.id = id;
    this.matricula = dadosNormalizados.matricula;
    this.nome = dadosNormalizados.nome;
    this.email = dadosNormalizados.email;
    this.curso = dadosNormalizados.curso;
    this.notas = [...notas];
  }
}
