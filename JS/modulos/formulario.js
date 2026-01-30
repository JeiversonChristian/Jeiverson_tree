/* --- MÓDULO: LÓGICA DO FORMULÁRIO --- */

/* Exporto a função principal */
export default function iniciarLogicaFormulario() {

    const formularioContato = document.getElementById('meu-formulario');

    /* Se não existir formulário na página (ex: estou na home), paro aqui */
    if (!formularioContato) return;

    formularioContato.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const statusTexto = document.getElementById('mensagem-status');
        const dadosDoFormulario = new FormData(formularioContato);

        try {
            statusTexto.innerText = "Enviando..."; // Feedback imediato
            
            const resposta = await fetch(evento.target.action, {
                method: formularioContato.method,
                body: dadosDoFormulario,
                headers: { 'Accept': 'application/json' }
            });

            if (resposta.ok) {
                statusTexto.innerText = "Mensagem enviada com sucesso! Obrigado.";
                statusTexto.className = "status-envio sucesso"; // Reseta classes e adiciona sucesso
                formularioContato.reset();
            } else {
                statusTexto.innerText = "Ops! Houve um erro ao enviar.";
                statusTexto.className = "status-envio erro";
            }

        } catch (erro) {
            statusTexto.innerText = "Erro de conexão. Tente novamente.";
            statusTexto.className = "status-envio erro";
        }
    });

    console.log("Módulo de Formulário carregado com sucesso.");
}