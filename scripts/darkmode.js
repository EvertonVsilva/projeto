        // Seleciono o botão de toggle e o ícone dentro dele
        const darkModeToggle = document.getElementById('darkModeToggle');
        const darkModeIcon = document.getElementById('darkModeIcon');
        const body = document.body;

        // Adiciono um event listener no botão para alternar o modo dark ao clicar
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode'); // Troco a classe 'dark-mode' no body

            // Verifico se o modo dark está ativo para mudar o ícone do botão
            if (body.classList.contains('dark-mode')) {
                darkModeIcon.classList.remove('fa-moon');
                darkModeIcon.classList.add('fa-sun'); // Mudo o ícone de lua para sol
            } else {
                darkModeIcon.classList.remove('fa-sun');
                darkModeIcon.classList.add('fa-moon'); // Mudo de volta para lua
            }
        });