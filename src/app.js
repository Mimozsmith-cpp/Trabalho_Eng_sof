
// geração de id unico
function gerarId() {

  return Math.random(1 * 100)
}

// função de cadastro de aluno no sistema
function cadastrarAluno(){

    const nome = document.querySelector('#nome').value
    const senha = document.querySelector('#senha').value
    const email = document.querySelector('#email').value
    const cpf = document.querySelector('#cpf').value
    const avisoCadastro = document.querySelector('#cadastro')

    let obj = {
        id: gerarId(),
        nome: nome,
        email: email,
        cpf: cpf,
        senha: senha,
        livro: ""
    }

    let objJson = JSON.stringify(obj)

    localStorage.setItem(obj.id, objJson)
    localStorage.setItem('emailIndex:' + email, obj.id);

    avisoCadastro.innerHTML = "Cadastro realizado com sucesso!!!"
    avisoCadastro.style.color = "green"

}

// função para efetuar login do aluno
function loginAluno(){ 

    const email = document.querySelector('#email').value
    const senha = document.querySelector('#senha').value
    const avisoLogin = document.querySelector('#login')

    const aluno = checarAluno(email, senha)
  
    if (aluno){
        sessionStorage.setItem('alunoLogado', aluno.id);

        console.log("login efetuado com sucesso!!!")
        avisoLogin.innerHTML = "login efetuado com sucesso!!!"
        avisoLogin.style.color = "green"
        window.location.href = "biblioteca.html"
    } else {
        console.log("Email ou senha incorretos!!!")
        avisoLogin.innerHTML = "Email ou senha incorretos!!!"
        avisoLogin.style.color = "red"
    }
   
}

// função para verificar se o aluno esta no BD
function checarAluno(email, senha){

    const alunoId = localStorage.getItem('emailIndex:' + email);

    if (alunoId){
        const alunoJson = localStorage.getItem(alunoId)
        const aluno = JSON.parse(alunoJson)

        if (aluno.senha === senha){
            return aluno
        }
    }
}

const inventario = [
  "Dom Quixote",
  "O Senhor dos Anéis",
  "O Pequeno Príncipe",
  "1984",
  "Cem Anos de Solidão",
  "Orgulho e Preconceito",
  "O Hobbit",
  "A Odisséia",
  "Crime e Castigo",
  "Moby Dick",
  "A Revolução dos Bichos",
  "O Apanhador no Campo de Centeio",
  "O Grande Gatsby",
  "Admirável Mundo Novo",
  "A Arte da Guerra",
  "O Alquimista",
  "Eu, Robô",
  "Duna",
  "Neuromancer",
  "O Nome do Vento"
];

// função para verificar quais livros estao disponiveis na biblioteca
function listarLivros() {
  const listaLivros = document.getElementById("inventario") 
  listaLivros.innerHTML = "" 
  
  inventario.forEach(livro => {
      const itemLista = document.createElement("li");
      itemLista.textContent = livro;
      listaLivros.appendChild(itemLista);
  });
}

// Função para pegar livro emprestado
function emprestimoLivro() {
    const aluno = getAlunoLogado()
    const avisoEmprestimo = document.querySelector('#emprestimo')

    if (aluno.livro !== "") {
        avisoEmprestimo.innerHTML = "Você já está com um livro emprestado!!!"
        return
    }

    const livroDesejado = document.getElementById('inpLivro').value;

    if (inventario.includes(livroDesejado)) {
        aluno.livro = livroDesejado;

        inventario = inventario.filter(livro => livro !== livroDesejado);

        localStorage.setItem(aluno.id, JSON.stringify(aluno));
        listarLivros()
        avisoEmprestimo.innerHTML = "Livro emprestado com sucesso!!!"
    } else {
        avisoEmprestimo.innerHTML = "Livro não encontrado no inventário!!!"
    }
}

// Função para devolver livro 
function devolverLivro() {
    const aluno = getAlunoLogado()
    const avisoDevolucao = document.querySelector('#devolver')

    if (aluno.livro === "") {
        avisoDevolucao.innerHTML = "Você não tem livros para devolver!!!"
        return
    } else {
        inventario.push(aluno.livro)

        aluno.livro = ""
        localStorage.setItem(aluno.id, JSON.stringify(aluno))
        listarLivros()
        avisoDevolucao.innerHTML = "Livro devolvido com sucesso!!!"
    }

}

// Função para obter o aluno logado
function getAlunoLogado() {
    const alunoId = sessionStorage.getItem('alunoLogado')
    if (alunoId) {
        const alunoJson = localStorage.getItem(alunoId)
        if(alunoJson) {
            return JSON.parse(alunoJson)
        }
    } else {
      return null
    }
}