import PromptSync from "prompt-sync";
const input = PromptSync()

export function limparTela():void{
    process.stdout.write('\x1Bc');
}
export function limparTelaEnter():void{
    input("")
    process.stdout.write('\x1Bc');
}