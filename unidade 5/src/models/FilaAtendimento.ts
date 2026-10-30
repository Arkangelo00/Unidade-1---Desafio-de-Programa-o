import type { Chamado, ResumoChamado } from "./Chamado.js";

export class FilaAtendimento {
  #fila: Chamado[] = [];
  adicionarChamado(chamado: Chamado): void { this.#fila.push(chamado); }
  retirarProximo(): Chamado | null { return this.#fila.shift() ?? null; }
  get tamanho(): number { return this.#fila.length; }
  gerarRelatorio(): ResumoChamado[] { return this.#fila.map((chamado) => chamado.obterResumo()); }
}
