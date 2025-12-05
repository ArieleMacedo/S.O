"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Escalonador = exports.Tarefa = void 0;
class Tarefa {
    _id = 1;
    _ingressoOriginal;
    duracao;
    _prioridade;
    _executado = 0;
    _termino = null;
    ingresso;
    constructor(ingresso, duracao, prioridade) {
        this.ingresso = ingresso;
        this._ingressoOriginal = ingresso;
        this.duracao = duracao;
        this._prioridade = prioridade;
    }
    get prioridade() {
        return this._prioridade;
    }
    set prioridade(umId) {
        this._prioridade = umId;
    }
    get id() {
        return this._id;
    }
    set id(umId) {
        this._id = umId;
    }
    get ingressoOriginal() {
        return this._ingressoOriginal;
    }
    get restante() {
        return this.duracao - this._executado;
    }
    get termino() {
        return this._termino;
    }
    registrarExecucao(t) {
        this._executado += t;
    }
    concluir(tempo) {
        this._termino = tempo;
    }
    terminou() {
        return this._executado >= this.duracao;
    }
}
exports.Tarefa = Tarefa;
class Escalonador {
    _tarefas = [];
    _filaProntas = [];
    _idTarefa = 1;
    _quantum;
    _trocaDeContexto;
    _relogio = 0;
    constructor(quantum, tc) {
        this._quantum = quantum;
        this._trocaDeContexto = tc;
    }
    adicionarTarefa(tarefas) {
        for (let t of tarefas) {
            t.id = this._idTarefa++;
            this._tarefas.push(t);
        }
    }
    carregarProntas() {
        const prontas = this._tarefas.filter((t) => t.ingresso <= this._relogio);
        this._filaProntas.push(...prontas);
        this._tarefas = this._tarefas.filter((t) => t.ingresso > this._relogio);
    }
    executar() {
        this._tarefas.sort((a, b) => a.ingresso - b.ingresso);
        while (true) {
            this.carregarProntas();
            if (this._filaProntas.length === 0) {
                if (this._tarefas.length === 0)
                    break;
                this._relogio = this._tarefas[0].ingresso;
                continue;
            }
            this._filaProntas.sort((a, b) => {
                if (a.ingresso === b.ingresso) {
                    return a.id - b.id;
                }
                return a.ingresso - b.ingresso;
            });
            const tarefa = this._filaProntas.shift();
            const tempoExec = Math.min(this._quantum, tarefa.restante);
            tarefa.registrarExecucao(tempoExec);
            this._relogio += tempoExec;
            this.carregarProntas();
            if (tarefa.terminou()) {
                tarefa.concluir(this._relogio);
                if (this._tarefas.length > 0 || this._filaProntas.length > 0) {
                    this._relogio += this._trocaDeContexto;
                }
            }
            else if (this._tarefas.length === 0 && this._filaProntas.length === 0) {
                const tempoExec = tarefa.restante;
                tarefa.registrarExecucao(tempoExec);
                this._relogio += tempoExec;
                tarefa.concluir(this._relogio);
                break;
            }
            else {
                tarefa.ingresso = this._relogio;
                this._relogio += this._trocaDeContexto;
                this.carregarProntas();
                this._filaProntas.push(tarefa);
            }
        }
    }
    gerarResumo(tarefas) {
        console.log("\n--- Resumo Final ---");
        console.log("ID  | Ing | Dur | Prio  | Término | Vida | Espera");
        console.log("----------------------------------------------");
        let somaVida = 0;
        let somaEspera = 0;
        for (const t of tarefas) {
            const vida = t.termino - t.ingressoOriginal;
            const espera = vida - t.duracao;
            somaVida += vida;
            somaEspera += espera;
            console.log(`${String(t.id).padEnd(4)}| ` +
                `${String(t.ingressoOriginal).padEnd(4)}| ` +
                `${String(t.duracao).padEnd(4)}| ` +
                `${String(t.prioridade).padEnd(6)}|` +
                `${String(t.termino).padEnd(9)}| ` +
                `${String(vida).padEnd(5)}| ` +
                `${String(espera).padEnd(6)}`);
        }
        console.log("----------------------------------------------");
        console.log(`Tempo médio de vida: ${(somaVida / tarefas.length).toFixed(2)}`);
        console.log(`Tempo médio de espera: ${(somaEspera / tarefas.length).toFixed(2)}`);
    }
}
exports.Escalonador = Escalonador;
let esc = new Escalonador(2, 0);
let t1 = new Tarefa(0, 5, 2);
let t2 = new Tarefa(0, 2, 3);
let t3 = new Tarefa(1, 4, 1);
let t4 = new Tarefa(3, 1, 4);
let t5 = new Tarefa(5, 2, 5);
esc.adicionarTarefa([t1, t2, t3, t4, t5]);
esc.executar();
esc.gerarResumo([t1, t2, t3, t4, t5]);
//# sourceMappingURL=circular_prioridade.js.map