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

    //validar cadastro
    //validar nome (Se está em branco ou já foi cadastrado)
    if (nome.value == "") {
        document.getElementById("nomeValidar").innerHTML = `O campo nome está em branco!`
    }

    //validar nascimento (Se está em branco)
    if (nascimento.value == "") {
        document.getElementById("nascimentoValidar").innerHTML = `O campo data de nascimento está em branco!`
    }

    //validar se o campo cpf esta vazio e se esta correto
    if (cpf.value == "" || cpf == null) {
        document.getElementById("cpfValidar").innerHTML = `O campo CPF está em branco!`
    }

    if ((cpf.value !== "") && (validarCPF() !== true) && (cpf.value.length == 11)) {
        document.getElementById("cpfValidar").innerHTML = `Digite um CPF válido!`
    }

    if ((cpf.value !== "") && (validarCPF() !== true) && (cpf.value.length !== 11)) {
        document.getElementById("cpfValidar").innerHTML = `O campo CPF deve conter 11 dígitos!`
    }

    if ((cpf.value !== "") && (validarCPF() == true) && (compararCpfs() == true)) {
        document.getElementById("cpfValidar").innerHTML = `Esse CPF já foi cadastrado!`
    } 
  
    function validarCPF(){
        if(valida_cpf(document.getElementById("cpfUsuario").value))
            return true;
    }
    

    //Validador de CPF
    function valida_cpf(cpf){
          var numeros, digitos, soma, i, resultado, digitos_iguais;
          digitos_iguais = 1;
          if (cpf.length < 11)
                return false;
          for (i = 0; i < cpf.length - 1; i++)
                if (cpf.charAt(i) != cpf.charAt(i + 1))
                      {
                      digitos_iguais = 0;
                      break;
                      }
          if (!digitos_iguais)
                {
                numeros = cpf.substring(0,9);
                digitos = cpf.substring(9);
                soma = 0;
                for (i = 10; i > 1; i--)
                      soma += numeros.charAt(10 - i) * i;
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(0))
                      return false;
                numeros = cpf.substring(0,10);
                soma = 0;
                for (i = 11; i > 1; i--)
                      soma += numeros.charAt(11 - i) * i;
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(1))
                      return false;
                return true;
                }
          else
                return false;
    }

    //validar se o cpf já foi cadastrado
    function compararCpfs() {

        for (i = 0; i < usuarios.length; i++) {

            let numeroCpf = document.getElementById("cpfUsuario").value
            
            console.log(usuarios[i].cpf)
            if (usuarios[i].cpf !== numeroCpf) {
                console.log("Não foi cadastrado!")
                return false
            } else {
                document.getElementById("cpfValidar").innerHTML = `Esse CPF já foi cadastrado!`
                return true
            }
        }

    }

    //validar se o e-mail está em branco
    if (email.value == "") {
        document.getElementById("emailValidar").innerHTML = `O campo e-mail está em branco!`
        //validar se o e-mail esta escrito corretamente
        } else if (((email !== "") && (validarEmail(email) == false))) {
            document.getElementById("emailValidar").innerHTML = `E-mail inválido!`

        }

    //função validar expressão do e-mail
    function validarEmail(email) {
        var emailCheck = email.value;
        var filtro = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (filtro.test(emailCheck)) {
            return true;
        } else {
            return false;
        }
    }

    //validacao da senha
    if (senha.value == "") {
        document.getElementById("senhaValidar").innerHTML = `O campo senha está em branco!`
    }  else if (senha.value !== "" && senhaConfirmacao.value === "") {
        document.getElementById("senhaValidar").innerHTML = `O campo  de confirmação de senha está em branco!`
    }

    if (senhaConfirmacao.value == "") {
        document.getElementById("senhaValidar").innerHTML = `O campo  de confirmação de senha está em branco!`
    }  else if (senha.value === "" && senhaConfirmacao.value !== "") {
        document.getElementById("senhaValidar").innerHTML = `O campo senha está em branco!`
    }

    if ((senha.value !== "" && senhaConfirmacao.value !== "") && (senha.value !== senhaConfirmacao.value)) {
        document.getElementById("senhaValidar").innerHTML = `Os campos senhas e confirmação de senha estão com valores diferentes!`
    }
    
    //validar bairro (Se está em branco)
    if ((bairro.value == "") || (dataBairros.includes(bairro.value) !== true)) {
        document.getElementById("bairroValidar").innerHTML = `O campo bairro não foi selecionado!`
    }
    if (bairro.value == null) {
        document.getElementById("bairroValidar").innerHTML = `O campo bairro não foi selecionado!`
    }

    //Fazer a validação das validações para rodar a função construtura e dar push no array
    if ((nome.value !== "") && (nascimento.value !== "") && ((cpf !== "") && (validarCPF() == true) && (compararCpfs() !== true)) && ((email.value !== "") && (validarEmail(email) == true)) && (senha.value == senhaConfirmacao.value) && (bairro.value !== "") && (dataBairros.includes(bairro.value) == true) && (bairro.value !== null)) {

        let novoUsuario = new criaUsuario(nome.value, nascimento.value, cpf.value, email.value, senha.value, bairro.value)
        
        let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))
        listaUsuarios.push(novoUsuario)
        alert("Usuário cadastrado com sucesso!")
        localStorage.setItem("usuários", JSON.stringify(listaUsuarios))
        //window.location.href = "loginUsuario.html"
    }
    //limpar campos
    document.forms[0].reset();

}

//Função para logar
function login() {
    
    let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))
    let loginCpf = document.getElementById("loginCpf").value
    let loginSenha = document.getElementById("loginSenha").value
        //For para validação de login corret ou incorreto
    for (i = 0; i < listaUsuarios.length; i++) {
        console.log(listaUsuarios[i].cpf)
        console.log(listaUsuarios[i].senha)
            //Construir validação
        if ((listaUsuarios[i].cpf == loginCpf) && (listaUsuarios[i].senha == loginSenha)) {
            alert("Logado!")
            window.location.href = "criarLista.html"
        }
    }
    document.getElementById("loginValidar").innerHTML = `CPF e/ou senha estão incorreto!`
}

//delimitar no html min e max tamanho dos campos 
//maxlenght="40"     minlenght="5"

//função alterar senha
function alterarSenha() {

    let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))
    let cpfParaChecar = document.getElementById("alterarSenhaCpf").value
    let emailParaChecar = document.getElementById("alterarSenhaEmail").value

    for (i = 0; i < listaUsuarios.length; i++) {
        
        if ((cpfParaChecar == listaUsuarios[i].cpf) && (emailParaChecar == listaUsuarios[i].email)) {
        
            listaUsuarios[i].senha = document.getElementById("alterarSenhaNova").value
            usuarios = listaUsuarios
            localStorage.setItem("usuários", JSON.stringify(usuarios))
            alert("Senha alterada com sucesso!")
            window.location.href = "loginUsuario.html"
        } else {
            document.getElementById("loginValidar").innerHTML = `CPF e/ou E-mail inválido!`
        }
    }
}

//Função para voltar para pagina anterior
function voltar() {
    window.history.back()
}

