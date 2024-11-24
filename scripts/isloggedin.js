document.addEventListener("DOMContentLoaded", function () {
    const destaquesButtonContainer = document.getElementById("destaquesButtonContainer");

    // Verifica se o usuário está logado
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
        // Cria o botão "Destaques" dinamicamente
        const destaquesButton = document.createElement("a");
        destaquesButton.href = "../paginas/destaques.html";
        destaquesButton.className = "nav-link";
        destaquesButton.textContent = "Destaques";

        // Adiciona o botão ao contêiner
        const listItem = document.createElement("li");
        listItem.className = "nav-item";
        listItem.appendChild(destaquesButton);
        destaquesButtonContainer.appendChild(listItem);

        // Exibe a sugestão "Destaques" no campo de sugestões
        const destaquesSuggestion = document.querySelector('.suggestion-item[data-type="destaques"]');
        if (destaquesSuggestion) {
            destaquesSuggestion.style.display = 'block'; // Exibe a sugestão de "Destaques"
        }

        
    } else {
        // Caso não esteja logado, escondemos a sugestão "Destaques" no campo de pesquisa
        const destaquesSuggestion = document.querySelector('.suggestion-item[data-type="destaques"]');
        if (destaquesSuggestion) {
            destaquesSuggestion.style.display = 'none'; // Esconde a sugestão de "Destaques"
        }
    }
});

// Exemplo para simular login/logout
// localStorage.setItem("isLoggedIn", "true"); // Define como logado
// localStorage.setItem("isLoggedIn", "false"); // Define como deslogado
// Verificar se o usuário está logado


window.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginLink = document.querySelector('.nav-item a[href="..//paginas/login-register.html"]');
    const cadastroLink = document.querySelector('.nav-item a[href="..//paginas/cadastro.html"]');
    const logoutButtonContainer = document.getElementById('logoutButtonContainer');

    // Função para verificar as seleções de sugestão (quando o usuário clicar em uma sugestão)
    function selecionarSugestao(sugestao) {
        console.log('Você selecionou a sugestão: ' + sugestao);
        // Implementar lógica adicional caso necessário
    }

    // Se estiver logado, esconder os links de login e cadastro e mostrar o botão de logout
    if (isLoggedIn === 'true') {
        loginLink.style.display = 'none';  // Ocultar o link de login
        cadastroLink.style.display = 'none';  // Ocultar o link de cadastro
        logoutButtonContainer.style.display = 'block';  // Mostrar o botão de logout
        limparButtonContainer.style.display = 'block';
    }
});

// Função de limpar localstorage
document.getElementById('limparButton')?.addEventListener('click', function () {
    // Limpar o localStorage e redirecionar para a página de login
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    alert('Você saiu com sucesso!');
    window.location.href = '..//paginas/login-register.html'; // Redireciona para a página de login
});
// Função para fazer logout sem limpar o localStorage
document.getElementById('logoutButton')?.addEventListener('click', function () {
    // Definir o estado de login como 'false' no localStorage
    localStorage.setItem('isLoggedIn', 'false');

    // Atualizar a interface
    const loginLink = document.querySelector('.nav-item a[href="..//paginas/login-register.html"]');
    const cadastroLink = document.querySelector('.nav-item a[href="..//paginas/cadastro.html"]');
    const logoutButtonContainer = document.getElementById('logoutButtonContainer');

    // Exibir novamente os links de login e cadastro, e esconder o botão de logout
    loginLink.style.display = 'block';
    cadastroLink.style.display = 'block';
    logoutButtonContainer.style.display = 'none';
    destaquesButtonContainer.style.display = 'none';

    alert('Você saiu da sua conta!');
    window.location.reload();
});