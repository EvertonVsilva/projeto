// Seleciona os elementos das opções de tamanho, o texto do tamanho selecionado e o campo de informações
const sizeOptions = document.querySelectorAll('.size-option');
const selectedSizeText = document.getElementById('selected-size');
const sizeInfo = document.getElementById('size-info');
const infoText = document.getElementById('info-text');
const sizeImage = document.getElementById('size-image');
sizeImage.referrerPolicy = "no-referrer";


// Informações sobre os tamanhos
const sizeDescriptions = {
    P: "Tamanho Pequeno: indicado para pessoas com até 1,60m de altura.",
    M: "Tamanho Médio: ideal para pessoas entre 1,60m e 1,75m de altura.",
    G: "Tamanho Grande: indicado para pessoas acima de 1,75m de altura."
};

// Caminhos das imagens para cada tamanho
const sizeImages = {
    P: "https://i.imgur.com/LkmiU0i.png",  // Altere para o caminho correto da imagem de tamanho P
    M: "https://i.imgur.com/xdd7vCN.png",  // Altere para o caminho correto da imagem de tamanho M
    G: "https://i.imgur.com/iMh8fZ7.png"   // Altere para o caminho correto da imagem de tamanho G
};

// Adiciona o evento de clique para cada opção de tamanho
sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove a classe "active" de todos os botões
        sizeOptions.forEach(item => item.classList.remove('active'));
        
        // Adiciona a classe "active" no botão clicado
        option.classList.add('active');
        
        // Atualiza o texto do tamanho selecionado
        const selectedSize = option.getAttribute('data-size');
        selectedSizeText.textContent = selectedSize;
        
        // Exibe a informação correspondente ao tamanho selecionado
        infoText.textContent = sizeDescriptions[selectedSize];
        sizeInfo.classList.add('active');
        
        // Atualiza a imagem de acordo com o tamanho selecionado
        sizeImage.src = sizeImages[selectedSize];
        sizeImage.style.display = "block"; // Exibe a imagem
    });
});

// Exibe a informação do tamanho "P" e a imagem ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const defaultSize = 'P';
    selectedSizeText.textContent = defaultSize;
    infoText.textContent = sizeDescriptions[defaultSize];
    sizeImage.src = sizeImages[defaultSize];
    sizeImage.style.display = "block";
});
