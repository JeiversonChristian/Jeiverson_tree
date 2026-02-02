/* --- MÓDULO: MODAL DE PERFIL --- */

export default function iniciarModalPerfil() {
    
    /* Busco a imagem que dispara o modal (a foto do perfil no index) */
    const gatilho = document.querySelector('.gatilho-modal');
    /* Busco o modal em si (o fundo escuro) */
    const modal = document.getElementById('modal-perfil');
    
    /* Se não tiver esses elementos na página (ex: estou na pág de contato), não faço nada */
    if (!gatilho || !modal) return;

    /* Função para abrir o modal */
    function abrirModal() {
        /* Adiciono a classe que torna o modal visível no CSS */
        modal.classList.add('aberto');
    }

    /* Função para fechar o modal */
    function fecharModal(evento) {
        /* Se cliquei direto no fundo escuro (overlay) OU no texto de fechar... */
        /* ...então eu fecho. Se cliquei na caixa branca dentro, não fecho. */
        if (evento.target === modal || evento.target.id === 'fechar-modal') {
            modal.classList.remove('aberto');
        }
    }

    /* Adiciono os ouvintes de evento (cliques) */
    gatilho.addEventListener('click', abrirModal);
    modal.addEventListener('click', fecharModal);

    console.log("Módulo de Modal carregado.");
}