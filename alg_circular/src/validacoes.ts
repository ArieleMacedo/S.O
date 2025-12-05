import PromptSync from "prompt-sync";
import { limparTela } from "./utils";
const input = PromptSync({sigint:true})

export class Validacoes{

 numeroInteiro(text:string): number{
    let num = NaN;

    while (!Number.isInteger(num)){
    const valor = Number(input(text));

    if (Number.isInteger(valor)){
     num = valor;
   }else{
    console.log("Erro: Digite um número inteiro.");
   }
} return num;
}

 numIntMinMax(text: string, min: number, max: number): number{
  let num = NaN;
  
  while(isNaN(num)  ||num < min || num > max){
    const valor = this.numeroInteiro(text);

    if (valor >= min && valor <= max){
        num = valor
    }else{
        console.log(`O número deve estar entre ${min} e ${max}.`);
    }
  } return num;
}

 numFloatPositivo(text: string): number{
  let num = NaN
  while (isNaN(num) || num < 0){
    const valor = parseFloat(input((text)));

    if (!isNaN(valor) && valor >= 0){
     num = valor;
   }else{
    console.log("Digite um número maior ou igual a 0.")
   }
  }return num
 }

 numPositivo(text: string): number{
  let num = NaN;
  while (!Number(num)){
    const valor = Number(input(text))
    if (Number(valor) && valor > 0){
     num = valor;
   }else{
    console.log("Digite um número maior que 0.")
   }
  }return num;
 }

  validarTexto(text:string):string{
    let umtexto = "";
    while(umtexto.length === 0){
      const texto = input(text);
      if (texto.length> 0){
        umtexto = texto;
      }else{
        console.log("Insira um caracter.")
      }
    }return umtexto
  } 
}
