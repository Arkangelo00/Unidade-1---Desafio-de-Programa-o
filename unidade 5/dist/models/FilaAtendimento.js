var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FilaAtendimento_fila;
export class FilaAtendimento {
    constructor() {
        _FilaAtendimento_fila.set(this, []);
    }
    adicionarChamado(chamado) { __classPrivateFieldGet(this, _FilaAtendimento_fila, "f").push(chamado); }
    retirarProximo() { return __classPrivateFieldGet(this, _FilaAtendimento_fila, "f").shift() ?? null; }
    get tamanho() { return __classPrivateFieldGet(this, _FilaAtendimento_fila, "f").length; }
    gerarRelatorio() { return __classPrivateFieldGet(this, _FilaAtendimento_fila, "f").map((chamado) => chamado.obterResumo()); }
}
_FilaAtendimento_fila = new WeakMap();
