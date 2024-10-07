const sizeOptions = document.querySelectorAll('.size-option');
        const selectedSizeText = document.getElementById('selected-size');
        const sizeInfo = document.getElementById('size-info');
        const infoText = document.getElementById('info-text');

        // Informações sobre os tamanhos
        const sizeDescriptions = {
            P: "Tamanho Pequeno: indicado para pessoas com até 1,60m de altura.",
            M: "Tamanho Médio: ideal para pessoas entre 1,60m e 1,75m de altura.",
            G: "Tamanho Grande: indicado para pessoas acima de 1,75m de altura."
        };

        sizeOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remover a classe "active" de todos os botões
                sizeOptions.forEach(item => item.classList.remove('active'));
                
                // Adicionar a classe "active" no botão clicado
                option.classList.add('active');
                
                // Atualizar o texto do tamanho selecionado
                const selectedSize = option.getAttribute('data-size');
                selectedSizeText.textContent = selectedSize;
                
                // Exibir a informação correspondente ao tamanho selecionado
                infoText.textContent = sizeDescriptions[selectedSize];
                sizeInfo.classList.add('active');
            });
        });
        // Exibir a informação do tamanho P ao carregar a página
        document.addEventListener('DOMContentLoaded', () => {
            infoText.textContent = sizeDescriptions['P'];
        });