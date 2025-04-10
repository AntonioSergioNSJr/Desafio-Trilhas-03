# Formulário de Inscrição - Trilhas no Maranhão

Este projeto é um sistema de inscrição com autenticação simples, que permite aos usuários criarem contas, realizarem login e preencherem um formulário com seus dados pessoais. Após o envio do formulário, é gerado automaticamente um comprovante de inscrição em PDF.

## Funcionalidades

- Sistema de cadastro e login com validação.
- Armazenamento de dados de login no `localStorage`.
- Formulário completo com campos obrigatórios e validados.
- Geração de comprovante em PDF após envio do formulário.
- Interface visual com imagens e estilos personalizados.
## Atualizações Realizadas

### 1. Inclusão de Validação de CPF e Telefone
- Impede que letras sejam digitadas nos campos de CPF e telefone.
- Apenas números são aceitos dinamicamente via JavaScript.

### 2. Campo “Sexo” alterado para “Gênero”
- Mudança de nomenclatura para maior inclusão.
- Adicionada uma opção inicial "Selecione" para evitar seleção automática.

### 3. Campo “Número” com opção “S/N”
- O campo agora permite inserir o valor “S/N”.
- Tipo alterado de `number` para `text` com validação mantida.

### 4. Geração de PDF com os dados preenchidos
- Após o envio do formulário, os dados são exibidos na tela e salvos como PDF com a biblioteca `html2pdf.js`.

### 5. Estruturação do código JS
- Toda lógica centralizada em um único arquivo `script.js`.
- Separação clara entre login, cadastro e envio do formulário.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- [html2pdf.js](https://www.npmjs.com/package/html2pdf.js)

## Como Usar

1. Acesse a página inicial (`index.html`) e crie uma conta.
2. Após o cadastro, faça o login.
3. Preencha o formulário de inscrição com seus dados pessoais.
4. Clique em “Fazer Inscrição” para gerar o comprovante em PDF.

## Estrutura de Arquivos
├── index.html # Página inicial com login e cadastro ├── formulario.html # Formulário de inscrição ├── style.css # Estilização do sistema ├── script.js # Toda a lógica de autenticação e formulário └── /Assets # Imagens utilizadas no projeto

## Observações

- Certifique-se de preencher todos os campos obrigatórios.
- A validação é feita apenas no frontend.
- Este projeto pode ser adaptado para uso com backend real (ex: Firebase, Node.js, etc.).

## Autores
Antônio Sergio Nogueira de Sousa Junior
Sarah Cristinny Castro Monteiro

