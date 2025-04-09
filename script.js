document.addEventListener('DOMContentLoaded', () => {
    const caminho = window.location.pathname;
  
    aplicarMascaras();
  
    if (caminho.includes('login.html')) {
      const loginForm = document.getElementById('loginForm');
  
      loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const login = document.getElementById('login').value;
        if (login) {
          localStorage.setItem('loginUsuario', login);
          window.location.href = 'formulario.html';
        }
      });
    }
  
    if (caminho.includes('formulario.html')) {
      const formulario = document.querySelector('form');
  
      formulario?.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const cpfInput = document.querySelector('input[placeholder="123.456.789-00"]');
        const cpf = cpfInput.value;
  
        if (!validarCPF(cpf)) {
          alert("CPF inválido. Verifique e tente novamente.");
          cpfInput.focus();
          return;
        }
  
        alert("Inscrição realizada com sucesso!");
        localStorage.removeItem('loginUsuario');
        window.location.href = 'login.html';
      });
    }
  });
  
  // === MÁSCARAS ===
  function aplicarMascaras() {
    const cpfInput = document.querySelector('input[placeholder="123.456.789-00"]');
    const telInput = document.querySelector('input[placeholder="(99) 9 9999-9999"]');
    const cepInput = document.querySelector('input[placeholder^="65"]');
  
    if (cpfInput) {
      cpfInput.addEventListener('input', () => {
        cpfInput.value = cpfInput.value
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      });
    }
  
    if (telInput) {
      telInput.addEventListener('input', () => {
        telInput.value = telInput.value
          .replace(/\D/g, '')
          .replace(/^(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2')
          .slice(0, 15);
      });
    }
  
    if (cepInput) {
      cepInput.addEventListener('input', () => {
        cepInput.value = cepInput.value
          .replace(/\D/g, '')
          .replace(/(\d{5})(\d)/, '$1-$2')
          .slice(0, 9);
      });
    }
  }
  
  // === VALIDAÇÃO DE CPF ===
  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
  
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digito1 = resto >= 10 ? 0 : resto;
  
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digito2 = resto >= 10 ? 0 : resto;
  
    return digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10));
  }
  