/* --- APP PRINCIPAL --- */

/* Importando as funcionalidades das outras partes (Imports) */
import iniciarLogicaBotoes from './modulos/botoes.js';
import iniciarLogicaFormulario from './modulos/formulario.js';
/* NOVO: Importo o módulo do modal */
import iniciarModalPerfil from './modulos/modal.js';

/* --- INICIALIZAÇÃO --- */

// 1. Inicio a lógica dos botões
iniciarLogicaBotoes();

// 2. Inicio a lógica do formulário
iniciarLogicaFormulario();

// 3. NOVO: Inicio a lógica do modal de perfil (só vai funcionar onde tiver a foto com a classe gatilho)
iniciarModalPerfil();

console.log("Aplicação iniciada pelo Gerente (app.js)");