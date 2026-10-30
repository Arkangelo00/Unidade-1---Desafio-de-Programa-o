var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _VinculoNaTurma_frequencia;
export class VinculoNaTurma {
    constructor(estudante) {
        _VinculoNaTurma_frequencia.set(this, 100);
        this.estudante = estudante;
        this.dataEntrada = new Date();
    }
    get frequencia() { return __classPrivateFieldGet(this, _VinculoNaTurma_frequencia, "f"); }
    set frequencia(novaFrequencia) {
        if (!Number.isFinite(novaFrequencia) || novaFrequencia < 0 || novaFrequencia > 100)
            throw new Error("A frequência deve estar entre 0% e 100%.");
        __classPrivateFieldSet(this, _VinculoNaTurma_frequencia, novaFrequencia, "f");
    }
    obterDadosVinculo() { return { matricula: this.estudante.matricula, nome: this.estudante.nome, dataEntrada: this.dataEntrada.toLocaleDateString("pt-BR"), frequencia: `${__classPrivateFieldGet(this, _VinculoNaTurma_frequencia, "f")}%` }; }
}
_VinculoNaTurma_frequencia = new WeakMap();
