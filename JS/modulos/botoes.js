/* --- MÓDULO: LÓGICA DOS BOTÕES --- */

/* Eu exporto (disponibilizo) uma função padrão para quem quiser usar */
export default function iniciarLogicaBotoes() {
    
    const listaDeBotoes = document.querySelectorAll('.botao');

    /* Se não houver botões na página, eu paro aqui para não dar erro */
    if (listaDeBotoes.length === 0) return;

    listaDeBotoes.forEach(botao => {
        let idDoTemporizador = null;

        botao.addEventListener('click', (evento) => {
            const linkDoBotao = botao.getAttribute('href');

            if (linkDoBotao === '#') {
                evento.preventDefault();

                if (!botao.dataset.original) {
                    botao.dataset.original = botao.innerText;
                }

                if (idDoTemporizador) {
                    clearTimeout(idDoTemporizador);
                }

                botao.innerText = 'Em desenvolvimento pelo Jeiverson 🚧';
                botao.style.borderColor = '#ffbb33';
                botao.style.color = '#ffbb33';

                idDoTemporizador = setTimeout(() => {
                    botao.innerText = botao.dataset.original;
                    botao.style.borderColor = '';   
                    botao.style.color = '';         
                    idDoTemporizador = null;
                }, 2000);
            }
        });
    });
    
    // Apenas um log para você saber que esse módulo foi carregado
    console.log("Módulo de Botões carregado com sucesso.");
}