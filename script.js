//array para armazenar todos os usuarios cadastrados
var usuarios = []

//pega os dados do html
var nome = document.getElementById("nomeUsuario")
var nascimento = document.getElementById("nascimentoUsuario")
var cpf = document.getElementById("cpfUsuario")
var email = document.getElementById("emailUsuario")
var senha = document.getElementById("senhaUsuario")
var senhaConfirmacao = document.getElementById("confirmaSenhaUsuario")
var bairro = document.getElementById("bairroUsuario")

//cria um novo usuario
function criaUsuario(nome, nascimento, cpf, email, senha, bairro) {
    this.nome = nome
    this.nascimento = nascimento
    this.cpf = cpf
    this.email = email
    this.senha = senha
    this.bairro = bairro
}

//adiciona o novo usuario ao array 'usuarios[]'
function cadastrarUsuario() {
    //validacao da senha
    if (senha.value == senhaConfirmacao.value) {
        let novoUsuario = new criaUsuario(nome.value, nascimento.value, cpf.value, email.value, senha.value, bairro.value)
        usuarios.push(novoUsuario)
        alert("Usuário cadastrado com sucesso!")
        localStorage.setItem("usuários", JSON.stringify(usuarios))
    } else {
        alert("Senhas incompatíveis!")
    }
}