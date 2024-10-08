function verificarSelecao() {
    // Obtém o valor inserido no campo de busca
    var busca = document.getElementById("campoBusca").value.toLowerCase();

    // Mapeamento das opções para suas respectivas URLs
    var opcoes = {
        "inicio": "../paginas/index.html",
        "calças": "calcas.html",
        "acessórios": "acessorios.html",
        "tênis": "tenis.html",
        "moletons": "moletons.html"
    };

    // Verifica se o valor inserido tem uma URL correspondente
    if (opcoes[busca]) {
        // Redireciona para a URL correspondente automaticamente
        window.location.href = opcoes[busca];
    }
}