var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Estudante_notas;
import { CONFIG_ACADEMICA } from "../config/configuracao.js";
export class Estudante {
    constructor(matricula, nome, curso, ativo = true) {
        _Estudante_notas.set(this, []);
        this.matricula = matricula.trim();
        this.nome = nome.trim();
        this.curso = curso.trim();
        this.ativo = ativo;
    }
    adicionarNota(nota) {
        if (!Number.isFinite(nota) || nota < CONFIG_ACADEMICA.NOTA_MINIMA || nota > CONFIG_ACADEMICA.NOTA_MAXIMA) {
            throw new Error(`Nota inválida: ${nota}. A nota deve estar entre ${CONFIG_ACADEMICA.NOTA_MINIMA} e ${CONFIG_ACADEMICA.NOTA_MAXIMA}.`);
        }
        __classPrivateFieldGet(this, _Estudante_notas, "f").push(nota);
    }
    get media() {
        if (__classPrivateFieldGet(this, _Estudante_notas, "f").length === 0)
            return 0;
        const soma = __classPrivateFieldGet(this, _Estudante_notas, "f").reduce((acc, curr) => acc + curr, 0);
        return Number((soma / __classPrivateFieldGet(this, _Estudante_notas, "f").length).toFixed(2));
    }
    listarNotas() { return [...__classPrivateFieldGet(this, _Estudante_notas, "f")]; }
    obterResumo() {
        return { matricula: this.matricula, nome: this.nome, curso: this.curso, media: this.media, statusAprovacao: this.media >= CONFIG_ACADEMICA.MEDIA_MINIMA_APROVACAO ? "Aprovado" : "Em recuperação" };
    }
}
_Estudante_notas = new WeakMap();
