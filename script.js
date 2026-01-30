/* --- LÓGICA DO SITE (JAVASCRIPT) --- */

/* 1. SELEÇÃO DOS ELEMENTOS */
/* Busco todos os botões da página para adicionar a inteligência a eles. */
const listaDeBotoes = document.querySelectorAll('.botao');

/* 2. CRIANDO A INTERAÇÃO (LOOP) */
listaDeBotoes.forEach(botao => {

    /* Variável de Controle: */
    /* Criamos uma variável aqui fora para guardar o ID do temporizador deste botão específico. */
    /* Isso permite cancelar a contagem se o usuário clicar de novo muito rápido. */
    let idDoTemporizador = null;

    /* Adiciono um "Ouvinte" que fica esperando o clique. */
    botao.addEventListener('click', (evento) => {

        /* 3. VERIFICAÇÃO (CONDICIONAL) */
        const linkDoBotao = botao.getAttribute('href');

        /* Se o link for '#', significa que é um projeto em breve. */
        if (linkDoBotao === '#') {
            
            /* Bloqueio o comportamento padrão. */
            evento.preventDefault();

            /* 4. SALVAMENTO SEGURO (A CORREÇÃO DO BUG) */
            /* Antes de mudar o texto, verifico: "Eu já guardei o nome original deste botão?" */
            /* O 'dataset.original' é um lugar seguro no HTML para guardar informações escondidas. */
            
            /* Se NÃO tiver nada salvo ainda (!), eu salvo o texto atual. */
            /* Se já tiver salvo, eu não faço nada (para não salvar a mensagem de aviso por engano). */
            if (!botao.dataset.original) {
                botao.dataset.original = botao.innerText;
            }

            /* 5. LIMPEZA DE TEMPORIZADOR (ANTI-CLIQUE LOUCO) */
            /* Se já existir um temporizador rodando (do clique anterior), eu cancelo ele. */
            /* Isso impede que o botão tente voltar ao normal na hora errada. */
            if (idDoTemporizador) {
                clearTimeout(idDoTemporizador);
            }

            /* 6. FEEDBACK VISUAL */
            /* Agora posso mudar o texto sem medo, pois o original está salvo no dataset. */
            botao.innerText = 'Em desenvolvimento pelo Jeiverson 🚧';
            botao.style.borderColor = '#ffbb33'; // Amarelo/Laranja
            botao.style.color = '#ffbb33';

            /* 7. VOLTANDO AO NORMAL (TEMPORIZADOR) */
            /* Inicio uma nova contagem e guardo o ID dela. */
            idDoTemporizador = setTimeout(() => {
                
                /* Restauro o texto pegando do cofre seguro (dataset.original) */
                botao.innerText = botao.dataset.original; 
                
                /* Limpo as cores */
                botao.style.borderColor = '';   
                botao.style.color = '';         
                
                /* Zelo a variável do temporizador, pois a contagem acabou. */
                idDoTemporizador = null;

            }, 2000);
        }
        
    });
});