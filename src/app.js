
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

}

// função para efetuar login do aluno
function loginAluno(){ 

    const email = document.querySelector('#email').value
    const senha = document.querySelector('#senha').value

    const aluno = checarAluno(email, senha)
  
    if (aluno){
       console.log("login efetuado com sucesso!!!")
       window.location.href = "src\HTML\biblioteca.htm"
    } else {
        console.log("Email ou senha incorretos!!!")
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

// função para verificar quais livros estao disponiveis na biblioteca
function listarLivros(inv){

    for (i = 0; i < inv.lenght; i++){
        console.log(inv[i])
    }

}

// função para pegar livro emprestado
function emprestimoLivro(inv, aluno){

    if (aluno.livro !== ""){
        console.log("Voce ja esta com um livro emprestado, devolva antes de pegar outro!!!")
    } else {
        console.log("Informe qual dos livros diponiveis voce deseja: ")
        listarLivros(inv)
        aluno.livro = Input.value // definir de onde pegar o input

        localStorage.setItem(aluno.id, aluno)
    }

}


// função para devolver livro
function devolverLivro(aluno){

    if (aluno.livro === ""){
        console.log("Voce nao esta com um livro emprestado!!!")
    } else {
        aluno.livro = "" 
        console.log("Voce devolveu o livro com sucesso!!!")

        localStorage.setItem(aluno.id, aluno)
    }
}

