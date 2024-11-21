function mostrarSugestoes() {
    // Exibe as sugestões quando o campo de busca é clicado
    const suggestionsContainer = document.getElementById("suggestionsContainer");
    suggestionsContainer.style.display = "block";
}

function verificarSelecao() {
    // Obtém o valor inserido no campo de busca
    var busca = document.getElementById("campoBusca").value.toLowerCase();

    // Mapeamento das opções para suas respectivas URLs
    var opcoes = {
        "início": "../paginas/index.html",
        "destaques": "../paginas/destaques.html",
        "login": "../paginas/login-register.html",
        "cadastro": "cadastro.html"
    };

    // Verifica se o valor inserido tem uma URL correspondente
    if (opcoes[busca]) {
        // Redireciona para a URL correspondente automaticamente
        window.location.href = opcoes[busca];
    }
}

// Função para selecionar uma sugestão e preencher o campo de pesquisa
function selecionarSugestao(opcao) {
    const campoBusca = document.getElementById("campoBusca");
    campoBusca.value = opcao;
    window.location.href = mapearOpcaoParaURL(opcao.toLowerCase()); // Redireciona para a URL correspondente
}

// Função para mapear a opção para a URL
function mapearOpcaoParaURL(opcao) {
    var opcoes = {
        "início": "../paginas/index.html",
        "destaques": "../paginas/destaques.html",
        "login": "../paginas/login-register.html",
        "cadastro": "cadastro.html"
    };
    return opcoes[opcao] || "#"; // Retorna a URL ou # se não encontrar a opção
}

// Fecha as sugestões ao clicar fora do campo
document.addEventListener('click', function(event) {
    const suggestionsContainer = document.getElementById("suggestionsContainer");
    const campoBusca = document.getElementById("campoBusca");

    // Verifica se o clique foi fora do campo de busca e do container de sugestões
    if (!campoBusca.contains(event.target) && !suggestionsContainer.contains(event.target)) {
        suggestionsContainer.style.display = "none";
    }
});