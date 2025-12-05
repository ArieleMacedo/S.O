"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validacoes = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const input = (0, prompt_sync_1.default)({ sigint: true });
class Validacoes {
    numeroInteiro(text) {
        let num = NaN;
        while (!Number.isInteger(num)) {
            const valor = Number(input(text));
            if (Number.isInteger(valor)) {
                num = valor;
            }
            else {
                console.log("Erro: Digite um número inteiro.");
            }
        }
        return num;
    }
    numIntMinMax(text, min, max) {
        let num = NaN;
        while (isNaN(num) || num < min || num > max) {
            const valor = this.numeroInteiro(text);
            if (valor >= min && valor <= max) {
                num = valor;
            }
            else {
                console.log(`O número deve estar entre ${min} e ${max}.`);
            }
        }
        return num;
    }
    numFloatPositivo(text) {
        let num = NaN;
        while (isNaN(num) || num < 0) {
            const valor = parseFloat(input((text)));
            if (!isNaN(valor) && valor >= 0) {
                num = valor;
            }
            else {
                console.log("Digite um número maior ou igual a 0.");
            }
        }
        return num;
    }
    numPositivo(text) {
        let num = NaN;
        while (!Number(num)) {
            const valor = Number(input(text));
            if (Number(valor) && valor > 0) {
                num = valor;
            }
            else {
                console.log("Digite um número maior que 0.");
            }
        }
        return num;
    }
    validarTexto(text) {
        let umtexto = "";
        while (umtexto.length === 0) {
            const texto = input(text);
            if (texto.length > 0) {
                umtexto = texto;
            }
            else {
                console.log("Insira um caracter.");
            }
        }
        return umtexto;
    }
}
exports.Validacoes = Validacoes;
//# sourceMappingURL=validacoes.js.map