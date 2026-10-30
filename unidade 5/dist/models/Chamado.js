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
var _Chamado_status;
import { validarStatusChamado } from "../utils/validarStatusChamado.js";
export class Chamado {
    constructor(id, titulo, solicitante) {
        this.responsavel = null;
        _Chamado_status.set(this, "ABERTO");
        this.id = id;
        this.titulo = titulo.trim();
        this.solicitante = solicitante;
    }
    get status() { return __classPrivateFieldGet(this, _Chamado_status, "f"); }
    /** Só permite status pertencentes à união StatusChamado. */
    definirStatus(status) {
        if (!validarStatusChamado(status))
            throw new Error(`Status inválido: ${String(status)}`);
        if (status === "ABERTO") {
            if (__classPrivateFieldGet(this, _Chamado_status, "f") !== "ABERTO")
                throw new Error(`Transição inválida para ${status}.`);
            __classPrivateFieldSet(this, _Chamado_status, status, "f");
            return;
        }
        if (status === "EM_ATENDIMENTO") {
            this.atender(this.responsavel ?? "Técnico não identificado");
            return;
        }
        if (status === "FINALIZADO") {
            this.finalizar();
            return;
        }
        const statusInvalido = status;
        throw new Error(`Status não suportado: ${statusInvalido}`);
    }
    atender(tecnico) {
        if (__classPrivateFieldGet(this, _Chamado_status, "f") !== "ABERTO")
            throw new Error(`Transição inválida. Não é possível atender um chamado com status: ${__classPrivateFieldGet(this, _Chamado_status, "f")}`);
        this.responsavel = tecnico.trim();
        __classPrivateFieldSet(this, _Chamado_status, "EM_ATENDIMENTO", "f");
    }
    finalizar() {
        if (__classPrivateFieldGet(this, _Chamado_status, "f") !== "EM_ATENDIMENTO")
            throw new Error(`Transição inválida. Não é possível finalizar um chamado com status: ${__classPrivateFieldGet(this, _Chamado_status, "f")}`);
        __classPrivateFieldSet(this, _Chamado_status, "FINALIZADO", "f");
    }
    obterResumo() {
        return { id: this.id, titulo: this.titulo, solicitante: this.solicitante.nome, responsavel: this.responsavel ?? "Não atribuído", status: __classPrivateFieldGet(this, _Chamado_status, "f") };
    }
}
_Chamado_status = new WeakMap();
