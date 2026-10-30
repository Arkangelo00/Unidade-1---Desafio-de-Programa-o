var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Turma_vinculos;
import { VinculoNaTurma } from "./VinculoNaTurma.js";
export class Turma {
    constructor(codigo, componenteCurricular) {
        _Turma_vinculos.set(this, []);
        this.codigo = codigo.trim();
        this.componenteCurricular = componenteCurricular.trim();
    }
    matricularEstudante(estudante) {
        const jaMatriculado = __classPrivateFieldGet(this, _Turma_vinculos, "f").some((vinculo) => vinculo.estudante.matricula === estudante.matricula);
        if (jaMatriculado)
            throw new Error(`Estudante com matrícula ${estudante.matricula} já está matriculado nesta turma.`);
        __classPrivateFieldGet(this, _Turma_vinculos, "f").push(new VinculoNaTurma(estudante));
    }
    listarMatriculados() { return __classPrivateFieldGet(this, _Turma_vinculos, "f").map((vinculo) => vinculo.obterDadosVinculo()); }
    obterResumo() { return { codigo: this.codigo, componenteCurricular: this.componenteCurricular, totalAlunos: __classPrivateFieldGet(this, _Turma_vinculos, "f").length }; }
}
_Turma_vinculos = new WeakMap();
