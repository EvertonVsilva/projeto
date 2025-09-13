    const form = document.getElementById("cadastroForm");

    /* ---------- CPF ---------- */
    function validarCPF(cpf) {
      cpf = (cpf || "").replace(/[^\d]+/g, "");
      if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
      let soma = 0, resto;
      for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.substring(9, 10))) return false;
      soma = 0;
      for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      return resto === parseInt(cpf.substring(10, 11));
    }

    /* ---------- CEP via ViaCEP ---------- */
    async function buscarCEP(cep) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) return false;
        document.getElementById("logradouro").value = data.logradouro || "";
        document.getElementById("bairro").value = data.bairro || "";
        document.getElementById("cidade").value = data.localidade || "";
        document.getElementById("estado").value = data.uf || "";
        return true;
      } catch {
        return false;
      }
    }

    /* ---------- Telefones: normalização, formatação e validação ---------- */
    function onlyDigits(str) {
      return (str || "").replace(/\D/g, "");
    }

    /**
     * Recebe qualquer entrada, aceita:
     * - somente DDD+assinante (10 ou 11 dígitos) -> ex: 11987654321 (11) ou 1187654321 (10)
     * - com código do país (55...) -> ex: 5511987654321 (13) ou 551187654321 (12)
     * Retorna string formatada como:
     *  - (+55)AA-BBBBBBBB  (8 dígitos de assinante)
     *  - (+55)AA-BBBBBBBBB (9 dígitos de assinante)
     * Retorna null se inválido.
     */
    function formatPhoneToPattern(value) {
      let d = onlyDigits(value);

      if (!d) return null;

      // Se veio sem country code (10 ou 11 dígitos => AA + assinante)
      if (d.length === 10 || d.length === 11) {
        d = "55" + d; // adiciona country code
      }

      // Agora deve começar com 55
      if (!d.startsWith("55")) return null;

      const rest = d.slice(2); // parte após o country code
      const area = rest.slice(0,2);
      const subscriber = rest.slice(2);

      // subscriber pode ter 8 ou 9 dígitos
      if (subscriber.length === 8 || subscriber.length === 9) {
        return `(+55)${area}-${subscriber}`;
      }
      return null;
    }

    // Limpa mensagem de erro conforme digita
    ["celular","fixo"].forEach(id => {
      const el = document.getElementById(id);
      el.addEventListener("input", () => {
        const err = document.getElementById(id + "Erro");
        if (err) err.textContent = "";
      });

      // Ao sair do campo, tenta formatar automaticamente
      el.addEventListener("blur", () => {
        const formatted = formatPhoneToPattern(el.value);
        const err = document.getElementById(id + "Erro");
        if (formatted) {
          el.value = formatted;
          if (err) err.textContent = "";
        } else {
          if (err) err.textContent = "Formato esperado: (+55)AA-BBBBBBBB ou (+55)AA-BBBBBBBBB (aceita com/sem +55)";
        }
      });
    });

    /* ---------- SUBMIT (valida tudo) ---------- */
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let valido = true;

      // Nome
      const nome = document.getElementById("nome").value.trim();
      if (!/^[A-Za-zÀ-ÿ\s]{8,60}$/.test(nome)) {
        document.getElementById("nomeErro").textContent = "Nome deve ter entre 8 e 60 caracteres alfabéticos.";
        valido = false;
      } else {
        document.getElementById("nomeErro").textContent = "";
      }

      // CPF
      const cpf = document.getElementById("cpf").value;
      if (!validarCPF(cpf)) {
        document.getElementById("cpfErro").textContent = "CPF inválido.";
        valido = false;
      } else {
        document.getElementById("cpfErro").textContent = "";
      }

      // Telefones (usa a função de formatação/normalização)
      const celularEl = document.getElementById("celular");
      const fixoEl = document.getElementById("fixo");

      const formattedCel = formatPhoneToPattern(celularEl.value);
      if (!formattedCel) {
        document.getElementById("celularErro").textContent = "Telefone celular inválido. Formato esperado (+55)AA-BBBBBBBB ou ...BBBBBBBBB";
        valido = false;
      } else {
        celularEl.value = formattedCel;
        document.getElementById("celularErro").textContent = "";
      }

      const formattedFixo = formatPhoneToPattern(fixoEl.value);
      if (!formattedFixo) {
        document.getElementById("fixoErro").textContent = "Telefone fixo inválido. Formato esperado (+55)AA-BBBBBBBB";
        valido = false;
      } else {
        fixoEl.value = formattedFixo;
        document.getElementById("fixoErro").textContent = "";
      }

      // CEP
      const cepRaw = document.getElementById("cep").value.replace(/\D/g,"");
      if (cepRaw.length === 8) {
        const ok = await buscarCEP(cepRaw);
        if (!ok) {
          document.getElementById("cepErro").textContent = "CEP inválido ou não encontrado (preencha manualmente).";
          // não forço invalidação completa: permite preencher manualmente, mas mantém aviso
        } else {
          document.getElementById("cepErro").textContent = "";
        }
      } else {
        document.getElementById("cepErro").textContent = "CEP deve ter 8 dígitos.";
        valido = false;
      }

      // Login (exatamente 6 letras)
      const login = document.getElementById("login").value.trim();
      if (!/^[A-Za-z]{6}$/.test(login)) {
        document.getElementById("loginErro").textContent = "Login deve ter exatamente 6 letras (A-Z).";
        valido = false;
      } else {
        document.getElementById("loginErro").textContent = "";
      }

      // Senhas (8 letras exatamente) e confirmação
      const senha = document.getElementById("senha").value;
      const confirmarSenha = document.getElementById("confirmarSenha").value;
      if (!/^[A-Za-z]{8}$/.test(senha)) {
        document.getElementById("senhaErro").textContent = "Senha deve ter exatamente 8 letras (A-Z).";
        valido = false;
      } else if (senha !== confirmarSenha) {
        document.getElementById("senhaErro").textContent = "As senhas não coincidem.";
        valido = false;
      } else {
        document.getElementById("senhaErro").textContent = "";
      }

      if (!valido) {
        // se algo inválido, evita enviar e mostra mensagens (já preenchidas)
        return;
      }

      // Simulação de criptografia (Base64) e envio
      const senhaCripto = btoa(senha);
      console.log("Senha criptografada (Base64):", senhaCripto);

      // Aqui você pode enviar via fetch para backend. Por enquanto demonstramos envio:
      alert("Formulário validado com sucesso! (submissão simulada)");
      // form.submit(); // descomente se quiser realmente submeter o form
    });