// Esta classe faz parte de uma relação de COMPOSIÇÃO com Turma.
// Ela gerencia os dados específicos do vínculo de um estudante em uma determinada turma.
export class VinculoNaTurma {
  estudante;
  dataEntrada;
  #frequencia;

  constructor(estudante) {
    this.estudante = estudante; // Associação com o objeto Estudante
    this.dataEntrada = new Date();
    this.#frequencia = 100.0; // Inicia com 100% de frequência padrão
  }

  get frequencia() {
    return this.#frequencia;
  }

  set frequencia(novaFrequencia) {
    if (novaFrequencia < 0 || novaFrequencia > 100) {
      throw new Error("A frequência deve estar entre 0% e 100%.");
    }
    this.#frequencia = novaFrequencia;
  }

  obterDadosVinculo() {
    return {
      matricula: this.estudante.matricula,
      nome: this.estudante.nome,
      dataEntrada: this.dataEntrada.toLocaleDateString("pt-BR"),
      frequencia: `${this.#frequencia}%`,
    };
  }
}
