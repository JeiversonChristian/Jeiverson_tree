/* --- LÓGICA DO SITE (JAVASCRIPT) --- */

/* 1. SELEÇÃO DOS ELEMENTOS */
/* Busca todos os elementos com a classe '.botao' na página */
const listaDeBotoes = document.querySelectorAll('.botao');

/* 2. ITERAÇÃO SOBRE OS BOTÕES */
listaDeBotoes.forEach(botao => {

    /* Variável de Controle Local: */
    /* Armazena o ID do temporizador para este botão específico. */
    /* Necessário para controlar cliques repetidos rapidamente. */
    let idDoTemporizador = null;

    /* Adiciona o ouvinte de evento para o clique */
    botao.addEventListener('click', (evento) => {

        /* 3. VERIFICAÇÃO DO TIPO DE LINK */
        /* Obtém o valor do atributo href */
        const linkDoBotao = botao.getAttribute('href');

        /* Se o link for '#', executa a lógica de "Em breve" */
        if (linkDoBotao === '#') {
            
            /* Previne a ação padrão (não adiciona # na URL nem sobe a página) */
            evento.preventDefault();

            /* 4. ARMAZENAMENTO DO TEXTO ORIGINAL */
            /* Verifica se o texto original já foi salvo no dataset */
            /* Se não existe (!), salva o texto atual. Se já existe, mantém o primeiro salvo. */
            if (!botao.dataset.original) {
                botao.dataset.original = botao.innerText;
            }

            /* 5. LIMPEZA DE TEMPORIZADOR (PREVENÇÃO DE CONFLITOS) */
            /* Se o usuário clicar novamente antes dos 2 segundos, limpa o temporizador anterior */
            /* Isso garante que o texto não volte ao normal antes da hora */
            if (idDoTemporizador) {
                clearTimeout(idDoTemporizador);
            }

            /* 6. APLICAÇÃO DO FEEDBACK VISUAL */
            /* Altera o texto e as cores para indicar desenvolvimento */
            botao.innerText = 'Em desenvolvimento pelo Jeiverson 🚧';
            botao.style.borderColor = '#ffbb33'; // Cor de alerta (Amarelo)
            botao.style.color = '#ffbb33';

            /* 7. RETORNO AO ESTADO ORIGINAL */
            /* Inicia uma nova contagem de tempo */
            idDoTemporizador = setTimeout(() => {
                
                /* Restaura o texto original salvo no dataset */
                botao.innerText = botao.dataset.original; 
                
                /* Remove as cores inline, voltando ao padrão do CSS */
                botao.style.borderColor = '';   
                botao.style.color = '';         
                
                /* Reseta a variável de controle */
                idDoTemporizador = null;

            }, 2000); // Aguarda 2000ms (2 segundos)
        }
        /* Se o link não for '#', o navegador segue o comportamento padrão (abrir link ou email) */
    });
});

/* --- LÓGICA DO FORMULÁRIO DE CONTATO (AJAX) --- */

/* 1. SELEÇÃO DO FORMULÁRIO */
/* Tento encontrar o formulário na página. */
const formularioContato = document.getElementById('meu-formulario');

/* Só executo o código abaixo SE o formulário existir (para não dar erro na página inicial que não tem form) */
if (formularioContato) {

    /* 2. INTERCEPTANDO O ENVIO */
    formularioContato.addEventListener('submit', async (evento) => {
        
        /* A primeira coisa: IMPEDIR o navegador de mudar de página. */
        evento.preventDefault();

        /* Seleciono o local onde vou escrever a mensagem de status */
        const statusTexto = document.getElementById('mensagem-status');
        
        /* Pego os dados que o usuário digitou no formulário */
        /* O 'FormData' empacota tudo (email, assunto, mensagem) num pacote pronto para envio. */
        const dadosDoFormulario = new FormData(formularioContato);

        /* 3. ENVIANDO OS DADOS (FETCH) */
        /* Uso o comando 'fetch' para enviar os dados para o endereço que está no 'action' do form HTML. */
        try {
            const resposta = await fetch(evento.target.action, {
                method: formularioContato.method, // Usa o método POST definido no HTML
                body: dadosDoFormulario,          // O conteúdo da carta
                headers: {
                    'Accept': 'application/json'  // IMPORTANTE: Diz ao Formspree: "Me responda com dados, não me redirecione!"
                }
            });

            /* 4. VERIFICANDO A RESPOSTA */
            /* Se o Formspree disser que está tudo OK (status 200) */
            if (resposta.ok) {
                statusTexto.innerText = "Mensagem enviada com sucesso! Obrigado.";
                statusTexto.classList.add('sucesso'); // Deixa o texto verde
                
                /* Limpo os campos do formulário para a pessoa não enviar duplicado sem querer */
                formularioContato.reset();
            } else {
                /* Se der algum problema no envio */
                statusTexto.innerText = "Ops! Houve um erro ao enviar.";
                statusTexto.classList.add('erro'); // Deixa o texto vermelho
            }

        } catch (erro) {
            /* Se houver um erro de rede (internet caiu, etc) */
            statusTexto.innerText = "Erro de conexão. Tente novamente.";
            statusTexto.classList.add('erro');
        }
    });
}