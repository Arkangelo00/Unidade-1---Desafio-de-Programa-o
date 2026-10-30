var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EstudanteService_estudantes;
import { Estudante } from "../models/Estudante.js";
import { validarEstudante } from "../utils/validarEstudante.js";
export class EstudanteService {
    constructor() {
        _EstudanteService_estudantes.set(this, []);
    }
    cadastrar(entrada) {
        const validacao = validarEstudante(entrada);
        if (!validacao.valido || typeof entrada !== "object" || entrada === null || Array.isArray(entrada))
            return { estudante: null, validacao };
        const dados = entrada;
        if (__classPrivateFieldGet(this, _EstudanteService_estudantes, "f").some((estudante) => estudante.matricula === dados.matricula.trim())) {
            return { estudante: null, validacao: { valido: false, erros: ["Matrícula já cadastrada."] } };
        }
        const curso = typeof dados.curso === "string" && dados.curso.trim() ? dados.curso.trim() : "Não informado";
        const estudante = new Estudante(dados.matricula, dados.nome, curso);
        __classPrivateFieldGet(this, _EstudanteService_estudantes, "f").push(estudante);
        return { estudante, validacao };
    }
    buscarPorMatricula(matricula) {
        const normalizada = matricula.trim();
        return __classPrivateFieldGet(this, _EstudanteService_estudantes, "f").find((estudante) => estudante.matricula === normalizada) ?? null;
    }
    listarTodos() { return [...__classPrivateFieldGet(this, _EstudanteService_estudantes, "f")]; }
    calcularMedia(estudante) { return estudante.media; }
}
_EstudanteService_estudantes = new WeakMap();
