export class FilaAtendimento {
  // Fila interna oculta (FIFO)
  #fila = [];

  // Encontra ao final
  adicionarChamado(chamado) {
    this.#fila.push(chamado);
  }

  // Remove e retorna do início (FIFO), devolve null se vazia
  retirarProximo() {
    if (this.tamanho === 0) return null;
    return this.#fila.shift();
  }

  get tamanho() {
    return this.#fila.length;
  }

  // Retorna projeções dos resumos sem expor o array interno mutável original
  gerarRelatorio() {
    return this.#fila.map((chamado) => chamado.obterResumo());
  }
}
