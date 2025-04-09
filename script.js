// Alternar entre formulários
function mostrarCriarConta() {
    document.getElementById('form-login').style.display = 'none';
    document.getElementById('form-criar-conta').style.display = 'block';
  }
  
  function mostrarLogin() {
    document.getElementById('form-criar-conta').style.display = 'none';
    document.getElementById('form-login').style.display = 'block';
  }
  
  // Criar Conta
  document.getElementById('form-criar-conta')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('criar-email').value.trim();
    const senha = document.getElementById('criar-senha').value;
  
    if (!email || !senha) {
      alert('Preencha todos os campos para criar a conta.');
      return;
    }
  
    const novoUsuario = { email, senha };
    localStorage.setItem('usuarioCadastrado', JSON.stringify(novoUsuario));
  
    alert('Cadastro realizado com sucesso! Você pode fazer login agora.');
    mostrarLogin();
  });
  
  // Login
  document.getElementById('form-login')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.getElementById('login-email').value.trim();
    const senha = document.getElementById('login-senha').value;
  
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioCadastrado'));
  
    if (!usuarioSalvo) {
      alert('Nenhum usuário cadastrado. Crie uma conta primeiro.');
      mostrarCriarConta();
      return;
    }
  
    if (email === usuarioSalvo.email && senha === usuarioSalvo.senha) {
      localStorage.setItem('usuarioLogado', JSON.stringify({ email }));
      window.location.href = 'formulario.html';
    } else {
      alert('Email ou senha incorretos!');
    }
  });
  
  // Formulário de Inscrição
  document.getElementById('formularioInscricao')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const form = e.target;
    const dados = {
      nome: form[0].value,
      nascimento: form[1].value,
      cpf: form[2].value,
      sexo: form[3].value,
      email: form[4].value,
      telefone: form[5].value,
      cep: form[7].value,
      endereco: form[8].value,
      numero: form[9].value,
      cidade: form[10].value,
      estado: form[11].value,
      trilha: document.querySelector('input[name="trilha"]:checked')?.parentNode.textContent.trim() || 'Não selecionado'
    };
  
    const comprovanteHTML = `
      <div id="comprovante" style="padding: 20px; font-family: Arial;">
        <h2>Inscrição realizada com sucesso!</h2>
        <h3>Comprovante de Inscrição</h3>
        <p><strong>Nome:</strong> ${dados.nome}</p>
        <p><strong>Data de Nascimento:</strong> ${dados.nascimento}</p>
        <p><strong>CPF:</strong> ${dados.cpf}</p>
        <p><strong>Sexo:</strong> ${dados.sexo}</p>
        <p><strong>Email:</strong> ${dados.email}</p>
        <p><strong>Telefone:</strong> ${dados.telefone}</p>
        <p><strong>CEP:</strong> ${dados.cep}</p>
        <p><strong>Endereço:</strong> ${dados.endereco}, Nº ${dados.numero}, ${dados.cidade} - ${dados.estado}</p>
        <p><strong>Trilha escolhida:</strong> ${dados.trilha}</p>
      </div>
    `;
  
    document.body.innerHTML = comprovanteHTML;
  
    const element = document.getElementById('comprovante');
  
    html2pdf().set({
      margin: 10,
      filename: 'comprovante_inscricao.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(element).save().then(() => {
      const voltarBtn = document.createElement('button');
      voltarBtn.textContent = 'Voltar à Página Inicial';
      voltarBtn.style.cssText = `
        margin-top: 30px;
        padding: 12px 24px;
        font-size: 16px;
        border: none;
        border-radius: 8px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        display: block;
      `;
      voltarBtn.onclick = () => {
        window.location.href = 'index.html';
      };
      document.body.appendChild(voltarBtn);
    });
  });
  