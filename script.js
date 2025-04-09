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
    window.location.href = 'formulario.html'; // Redireciona para o formulário
  } else {
    alert('Email ou senha incorretos!');
  }
});

// Máscara para CPF e Telefone (impede letras)
document.addEventListener('DOMContentLoaded', function () {
  const cpfInput = document.querySelector('input[placeholder="123.456.789-00"]');
  const telInput = document.querySelector('input[placeholder="(99) 9 9999-9999"]');

  cpfInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
  });

  telInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
  });
});

// Formulário de Inscrição
document.getElementById('formularioInscricao')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const numeroInput = form[9].value.trim().toUpperCase();

  // Validações básicas
  if (!/^\d+$/.test(form[2].value)) {
    alert('CPF deve conter apenas números.');
    return;
  }

  if (!/^\d+$/.test(form[5].value)) {
    alert('Telefone deve conter apenas números.');
    return;
  }

  if (!/^\d+$/.test(numeroInput) && numeroInput !== 'S/N') {
    alert('Número inválido. Use apenas números ou "S/N".');
    return;
  }

  const trilhaSelecionada = document.querySelector('input[name="trilha"]:checked')?.parentNode.textContent.trim() || 'Não selecionado';

  const dados = {
    nome: form[0].value,
    nascimento: form[1].value,
    cpf: form[2].value,
    genero: form[3].value,
    email: form[4].value,
    telefone: form[5].value,
    cep: form[7].value,
    endereco: form[8].value,
    numero: numeroInput,
    cidade: form[10].value,
    estado: form[11].value,
    trilha: trilhaSelecionada
  };

  // Mensagem de sucesso
  alert('Inscrição realizada com sucesso! O comprovante será gerado em PDF.');

  // Mostra apenas o comprovante
  document.body.innerHTML = `
    <div style="padding: 30px; font-family: sans-serif;">
      <h2>Comprovante de Inscrição</h2>
      <p><strong>Nome:</strong> ${dados.nome}</p>
      <p><strong>Data de Nascimento:</strong> ${dados.nascimento}</p>
      <p><strong>CPF:</strong> ${dados.cpf}</p>
      <p><strong>Gênero:</strong> ${dados.genero}</p>
      <p><strong>Email:</strong> ${dados.email}</p>
      <p><strong>Telefone:</strong> ${dados.telefone}</p>
      <p><strong>CEP:</strong> ${dados.cep}</p>
      <p><strong>Endereço:</strong> ${dados.endereco}, Nº ${dados.numero}, ${dados.cidade} - ${dados.estado}</p>
      <p><strong>Trilha escolhida:</strong> ${dados.trilha}</p>
    </div>
  `;

  // Gera o PDF
  html2pdf().set({
    margin: 10,
    filename: 'comprovante_inscricao.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(document.body).save();
});
