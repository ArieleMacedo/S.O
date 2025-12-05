
import promptSync from "prompt-sync";
import {Tarefa, Escalonador } from "./circular"; // ajuste o caminho conforme seu projeto
import { Validacoes } from "./validacoes";
import { limparTela, limparTelaEnter } from "./utils";
const prompt = promptSync({sigint: true});
let validacao: Validacoes = new Validacoes();

class App {
    private esc: Escalonador | null = null; // começa sem escalonador
    private tarefas: Tarefa[] = [];

    menu() {
        let opcao: string;
        limparTela()
        do {
            console.log("\n=== MENU ===");
            console.log("1 - Configurar escalonador");
            console.log("2 - Adicionar tarefa");
            console.log("3 - Executar escalonador (com resumo)");
            console.log("0 - Sair");

            opcao = prompt("Escolha uma opção: ");
            limparTela()

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

    private configurarEscalonador() {
        const quantum = validacao.numPositivo("Digite o quantum: ");
        const tc = validacao.numFloatPositivo("Digite o tempo de troca de contexto: ");
        this.esc = new Escalonador(quantum, tc);
        this.tarefas = []; 
        console.log("Escalonador configurado!");
        limparTelaEnter()
    }

    private adicionarTarefa() {
        if (!this.esc) {
            console.log("Configure o escalonador primeiro (opção 1).");
            return;
        }
        const qtd = validacao.numPositivo("Quantidade de tarefas que deseja adicionar: ");
        for (let i = 0; i < qtd; i++) {
            console.log(`\n--- Tarefa ${i + 1} ---`);
            const ingresso = validacao.numFloatPositivo("Tempo de ingresso da tarefa: ");
            const duracao = validacao.numFloatPositivo("Duração da tarefa: ");
            const prioridade = validacao.numFloatPositivo("Prioridade da Tarefa: ")
            const tarefa = new Tarefa(ingresso, duracao);
            this.esc.adicionarTarefa([tarefa]);
            this.tarefas.push(tarefa);
        }
        console.log(`${qtd} tarefas adicionadas com sucesso!`);
        limparTelaEnter()
    }

    private executarComResumo() {
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
        limparTelaEnter()

    }
}

const app = new App();
app.menu();
