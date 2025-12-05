"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limparTela = limparTela;
exports.limparTelaEnter = limparTelaEnter;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const input = (0, prompt_sync_1.default)();
function limparTela() {
    process.stdout.write('\x1Bc');
}
function limparTelaEnter() {
    input("");
    process.stdout.write('\x1Bc');
}
//# sourceMappingURL=utils.js.map