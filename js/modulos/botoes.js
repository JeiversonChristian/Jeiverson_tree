/* --- MÓDULO: LÓGICA DOS BOTÕES --- */

/* Eu exporto (disponibilizo) uma função padrão para quem quiser usar */
export default function iniciarLogicaBotoes() {
    
    /* Busco todos os elementos que têm a classe 'botao' no HTML */
    const listaDeBotoes = document.querySelectorAll('.botao');

    /* Se não houver botões na página, eu paro aqui para não dar erro */
    if (listaDeBotoes.length === 0) return;

    /* Para cada botão encontrado, executo essa lógica */
    listaDeBotoes.forEach(botao => {
        /* Variável para guardar o ID do temporizador (para poder cancelar se clicar rápido de novo) */
        let idDoTemporizador = null;

        /* Fico "ouvindo" quando alguém clica no botão */
        botao.addEventListener('click', (evento) => {
            /* Pego o link (href) para onde o botão deveria ir */
            const linkDoBotao = botao.getAttribute('href');

            /* Se o link for apenas '#', significa que é um botão "Em breve" */
            if (linkDoBotao === '#') {
                /* Impeço o comportamento padrão (não recarrega a página nem sobe pro topo) */
                evento.preventDefault();

                /* Salvo o texto original do botão na memória (dataset) se ainda não tiver salvo */
                if (!botao.dataset.original) {
                    botao.dataset.original = botao.innerText;
                }

                /* Se já tiver um temporizador rodando (clique duplo), eu cancelo o anterior */
                if (idDoTemporizador) {
                    clearTimeout(idDoTemporizador);
                }

                /* MUDANÇA IMPORTANTE: Adiciono uma classe especial para avisar o CSS */
                /* Essa classe vai impedir o efeito hover verde enquanto estivermos no modo alerta */
                botao.classList.add('botao-alerta');

                /* Mudo o texto e as cores para o estilo de alerta (amarelo) */
                botao.innerText = 'Em desenvolvimento pelo Jeiverson 🚧';
                botao.style.borderColor = '#ffbb33';
                botao.style.color = '#ffbb33';

                /* Configuro um temporizador para voltar ao normal depois de 2 segundos (2000ms) */
                idDoTemporizador = setTimeout(() => {
                    /* Restauro o texto original */
                    botao.innerText = botao.dataset.original;
                    /* Limpo as cores manuais para voltar ao CSS padrão */
                    botao.style.borderColor = '';   
                    botao.style.color = '';         
                    
                    /* MUDANÇA IMPORTANTE: Removo a classe de alerta, liberando o hover verde de novo */
                    botao.classList.remove('botao-alerta');
                    
                    /* Reseto o ID do temporizador */
                    idDoTemporizador = null;
                }, 2000);
            }
        });
    });

    /* --- NOVA LÓGICA: IMAGENS GATILHO --- */
    /* Aqui eu procuro as imagens que devem funcionar como botões de alerta */
    const imagensGatilho = document.querySelectorAll('.gatilho-aviso');

    imagensGatilho.forEach(imagemLink => {
        imagemLink.addEventListener('click', (e) => {
            e.preventDefault(); // Não faz nada padrão

            /* Truque ninja: Procuro o cartão (pai) onde essa imagem está */
            const cartaoPai = imagemLink.closest('.cartao-projeto');
            
            /* Dentro desse cartão, procuro o botão que tem href="#" (o botão "Em breve") */
            const botaoAlvo = cartaoPai.querySelector('.botao[href="#"]');

            /* Se eu achar o botão, eu simulo um clique nele via código! */
            /* Isso faz rodar toda a lógica lá de cima (texto amarelo, timer, etc) */
            if (botaoAlvo) {
                botaoAlvo.click();
            }
        });
    });
    
    /* Apenas um log para você saber que esse módulo foi carregado */
    console.log("Módulo de Botões carregado com sucesso.");
}