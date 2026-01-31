/* --- MÓDULO: LÓGICA DO FORMULÁRIO (VIA EMAILJS) --- */

/* Exporto a função principal para ser usada pelo app.js */
export default function iniciarLogicaFormulario() {

    /* Tento encontrar o formulário na página pelo ID definido no HTML */
    const formularioContato = document.getElementById('meu-formulario');

    /* Se não existir formulário na página (ex: estou na home), paro a execução aqui para não gerar erro */
    if (!formularioContato) return;

    /* Adiciono um ouvinte para o evento de 'submit' (envio) */
    formularioContato.addEventListener('submit', (evento) => {

        /* Primeiro passo: impeço o comportamento padrão do navegador (recarregar a página) */
        evento.preventDefault();

        /* Seleciono os elementos que vou manipular visualmente durante o envio */
        const statusTexto = document.getElementById('mensagem-status');
        const botaoEnviar = formularioContato.querySelector('button');

        /* Feedback Visual Imediato: */
        /* Aviso o usuário que o processo começou e bloqueio o botão para evitar cliques duplicados */
        statusTexto.innerText = "Enviando sua mensagem...";
        statusTexto.className = "status-envio"; // Reseto as classes de cor (tiro erro/sucesso antigos)
        botaoEnviar.disabled = true;
        botaoEnviar.innerText = "Enviando...";

        /* Configuração dos Identificadores do EmailJS (Que você criou) */
        /* Defino constantes para facilitar a troca caso precise mudar no futuro */
        const idDoServico = 'service_kpvtud8';
        const idDoModelo = 'template_j62ys6h';

        /* Executo o envio usando a biblioteca do EmailJS */
        /* O método 'sendForm' pega automaticamente os campos do HTML baseados no atributo 'name' */
        /* Nota: A Public Key já foi iniciada no HTML com o emailjs.init() */
        emailjs.sendForm(idDoServico, idDoModelo, formularioContato)
            .then(() => {
                /* CASO DE SUCESSO (.then) */
                /* Aviso que deu tudo certo e pinto o texto de verde (classe .sucesso do CSS) */
                statusTexto.innerText = "E-mail enviado com sucesso! Verifique sua caixa de entrada.";
                statusTexto.classList.add('sucesso');

                /* Limpo os campos do formulário para ficar pronto para um novo envio */
                formularioContato.reset();

                /* Crio um temporizador para restaurar o botão ao estado original após 5 segundos */
                setTimeout(() => {
                    statusTexto.innerText = ""; // Limpo a mensagem da tela
                    botaoEnviar.innerText = "Enviar Mensagem";
                    botaoEnviar.disabled = false; // Destravo o botão
                }, 5000);

            }, (erro) => {
                /* CASO DE ERRO */
                /* Se algo der errado (servidor fora do ar, chaves erradas), caio aqui */
                console.error('Erro detalhado do EmailJS:', erro); // Mostro o erro no console para depuração
                
                statusTexto.innerText = "Ops! Houve um erro ao enviar. Tente novamente.";
                statusTexto.classList.add('erro'); // Pinto o texto de vermelho

                /* Restauro o botão imediatamente para o usuário poder tentar de novo */
                botaoEnviar.innerText = "Enviar Mensagem";
                botaoEnviar.disabled = false;
            });
    });

    /* Log apenas para confirmar que o módulo foi carregado corretamente */
    console.log("Módulo de Formulário (EmailJS) carregado com sucesso.");
}