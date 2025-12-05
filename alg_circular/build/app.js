"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const circular_1 = require("./circular"); // ajuste o caminho conforme seu projeto
const validacoes_1 = require("./validacoes");
const utils_1 = require("./utils");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
let validacao = new validacoes_1.Validacoes();
class App {
    esc = null; // começa sem escalonador
    tarefas = [];
    menu() {
        let opcao;
        (0, utils_1.limparTela)();
        do {
            console.log("\n=== MENU ===");
            console.log("1 - Configurar escalonador");
            console.log("2 - Adicionar tarefa");
            console.log("3 - Executar escalonador (com resumo)");
            console.log("0 - Sair");
            opcao = prompt("Escolha uma opção: ");
            (0, utils_1.limparTela)();
            switch (opcao) {
                case "1":
                    this.configurarEscalonador();
                    break;
                case "2":
                    this.adicionarTarefa();
                    break;
                case "3":
                    this.executarComResumo();
                    break;
                case "0":
                    console.log("Encerrando...");
                    break;
                default:
                    console.log("Opção inválida!");
            }
        } while (opcao !== "0");
    }
    configurarEscalonador() {
        const quantum = validacao.numPositivo("Digite o quantum: ");
        const tc = validacao.numFloatPositivo("Digite o tempo de troca de contexto: ");
        this.esc = new circular_1.Escalonador(quantum, tc);
        this.tarefas = [];
        console.log("Escalonador configurado!");
        (0, utils_1.limparTelaEnter)();
    }
    adicionarTarefa() {
        if (!this.esc) {
            console.log("Configure o escalonador primeiro (opção 1).");
            return;
        }
        const qtd = validacao.numPositivo("Quantidade de tarefas que deseja adicionar: ");
        for (let i = 0; i < qtd; i++) {
            console.log(`\n--- Tarefa ${i + 1} ---`);
            const ingresso = validacao.numFloatPositivo("Tempo de ingresso da tarefa: ");
            const duracao = validacao.numFloatPositivo("Duração da tarefa: ");
            const prioridade = validacao.numFloatPositivo("Prioridade da Tarefa: ");
            const tarefa = new circular_1.Tarefa(ingresso, duracao);
            this.esc.adicionarTarefa([tarefa]);
            this.tarefas.push(tarefa);
        }
        console.log(`${qtd} tarefas adicionadas com sucesso!`);
        (0, utils_1.limparTelaEnter)();
    }
    executarComResumo() {
        if (!this.esc) {
            console.log("Configure o escalonador primeiro (opção 1).");
            return;
        }
        if (this.tarefas.length === 0) {
            console.log("Nenhuma tarefa adicionada.");
            return;
        }
        this.esc.executar();
        this.esc.gerarResumo(this.tarefas);
        (0, utils_1.limparTelaEnter)();
    }
}
const app = new App();
app.menu();
//# sourceMappingURL=app.js.map