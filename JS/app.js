/* --- APP PRINCIPAL --- */

/* Importando as funcionalidades das outras partes (Imports) */
/* Note que precisamos colocar o caminho e o ".js" no final */
import iniciarLogicaBotoes from './modulos/botoes.js';
import iniciarLogicaFormulario from './modulos/formulario.js';

/* --- INICIALIZAÇÃO --- */
/* Quando o site carregar, eu executo as funções */

// 1. Inicio a lógica dos botões (vai funcionar em qualquer página que tenha botões)
iniciarLogicaBotoes();

// 2. Inicio a lógica do formulário (o próprio módulo verifica se o form existe)
iniciarLogicaFormulario();

console.log("Aplicação iniciada pelo Gerente (app.js)");