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
    
    if (cpf == null || cpf !== null) {
        verificarCpf()
        document.getElementById("cpfValidar").innerHTML = `Digite um CPF valido!`

    } else if ((cpf !== '') && (verificarCpf() == true)) {
        compararCpfs()

    }


    function verificarCpf() {

        //pegando o cpf do usuario do html
        let cpfUsuario = cpf.value

        //separando o cpf em digitos
        let cpfUsuarioDigitos = cpfUsuario.toString().split('')
        let digitos = cpfUsuarioDigitos.map(Number)

        //atribuindo variaveis aos 2 ultimos digitos do cpf
        let digitoVerificador1 = digitos[9]
        let digitoVerificador2 = digitos[10]

        //criando a variavel multiplicadora
        let multiplicadorDig1 = 10
        let multiplicadorDig2 = 11

        //criando variaveis soma dos dois digitos verificadores
        let somaVerificador1 = 0
        let somaVerificador2 = 0

        //verificacao do primeiro digito
        //loop para somar a multiplicacao dos 9 primeiros digit com 10, 9, 8... ate 2
        for (i = 0; i < 9; i++) {
            somaVerificador1 += (digitos[i] * (multiplicadorDig1))
            multiplicadorDig1--
        }

        //calculo padrao com a soma encontrada para verificar o primeiro digito
        let restoDigito1 = ((somaVerificador1 * 10) % 11)
        if (restoDigito1 == 10 || restoDigito1 == 11) {
            restoDigito1 = 0
        } else {
            restoDigito1
        }

        //verificacao do segundo digito
        //loop para somar a multiplicacao dos 10 primeiros digit com 11, 10, 9, 8... ate 2
        for (i = 0; i < 10; i++) {
            somaVerificador2 += (digitos[i] * multiplicadorDig2)
            multiplicadorDig2--
        }

        //calculo padrao com a soma encontrada para verificar o segundo digito
        let restoDigito2 = ((somaVerificador2 * 10) % 11)
        if (restoDigito2 == 10 || restoDigito2 == 11) {
            restoDigito2 = 0
        } else {
            restoDigito2
        }

        //resultado usuario
        if (restoDigito1 === digitoVerificador1 && restoDigito2 === digitoVerificador2) {
            return true;

        } else {
            return false;
        }
    }

    //validar se o cpf já foi cadastrado
    function compararCpfs() {

        let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))
        console.log(listaUsuarios)

        for (i = 0; i < usuarios.length; i++) {

            let numeroCpf = cpf.value
            var validarCpf = listaUsuarios.filter(c => c.cpf.includes(numeroCpf))
            console.log(validarCpf)
            if (validarCpf.length == 1) {
                document.getElementById("cpfValidar").innerHTML = `Esse CPF já foi cadastrado!`
                return false
            }
        }

    }

    //validar se o e-mail está em branco
    if (email.value == "") {
        document.getElementById("emailValidar").innerHTML = `O campo e-mail está em branco!`
        //validar se o e-mail esta escrito corretamente
        } else if (((email !== '') && (validarEmail(email) == false))) {
            document.getElementById("emailValidar").innerHTML = `E-mail invalido!`

        } else {
            validarEmail(email)
    }

    //validacao da senha
    if (senha.value !== senhaConfirmacao.value) {
        document.getElementById("senhaValidar").innerHTML = `Senhas incompatíveis!`
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

    //validar bairro (Se está em branco)
    if ((bairro.value == "") || (dataBairros.includes(bairro.value) !== true)) {
        document.getElementById("bairroValidar").innerHTML = `O campo bairro não foi selecionado!`
    }
    if (bairro.value == null) {
        document.getElementById("bairroValidar").innerHTML = `O campo bairro não foi selecionado!`
    }

    //Fazer a validação das validações para rodar a função construtura e dar push no array
    if ((nome.value !== "") && (nascimento.value !== "") && (compararCpfs() !== false) && (verificarCpf() == true) && ((email.value !== "") && (validarEmail(email) == true)) && (senha.value == senhaConfirmacao.value) && (bairro.value !== "") && (dataBairros.includes(bairro.value) == true) && (bairro.value !== null)) {

        let novoUsuario = new criaUsuario(nome.value, nascimento.value, cpf.value, email.value, senha.value, bairro.value)
        usuarios.push(novoUsuario)
        alert("Usuário cadastrado com sucesso!")
        localStorage.setItem("usuários", JSON.stringify(usuarios))
        window.location.href = "loginUsuario.html"
    }
    //limpar campos
    document.getElementById("nomeUsuario").value = ''
    document.getElementById("nascimentoUsuario").value = ''
    document.getElementById("cpfUsuario").value = ''
    document.getElementById("emailUsuario").value = ''
    document.getElementById("senhaUsuario").value = ''
    document.getElementById("confirmaSenhaUsuario").value = ''
    document.getElementById("bairrosUsuario").value = null

}

//Função para logar
function login() {

    let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))
    let loginCpf = document.getElementById("loginCpf").value
    let loginSenha = document.getElementById("loginSenha").value
    console.log("listaUsuarios: " + listaUsuarios)
    console.log("loginCpf: " + loginCpf)
    console.log("loginSenha: " + loginSenha)
        //For para validação de login corret ou incorreto
    for (i = 0; i < listaUsuarios.length; i++) {

        let validarLoginCpf = listaUsuarios.filter(l => l.cpf.includes(loginCpf))
        let validarLoginSenha = listaUsuarios.filter(s => s.senha.includes(loginSenha))
        console.log(validarLoginCpf)
        console.log(validarLoginSenha)
            //Construir validação
        if ((validarLoginCpf.length == 1) && (validarLoginSenha.length == 1)) {
            alert("Logado!")
            window.location.href = "criarLista.html"
        } else {
            alert("CPF e/ou senha estão incorreto!")
        }
    }
    
}

//delimitar no html min e max tamanho dos campos 
//maxlenght=""     minlenght=""

//função alterar senha
function alterarSenha() {

    let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))
    let cpfParaChecar = document.getElementById("alterarSenhaCpf").value
    let emailParaChecar = document.getElementById("alterarSenhaEmail").value
    let senhaParaAlterar = document.getElementById("alterarSenhaNova").value

    for (i = 0; i < listaUsuarios.length; i++) {

        let validarLoginCpf = listaUsuarios.filter(c => c.cpf.includes(cpfParaChecar))
        let validarLoginEmail = listaUsuarios.filter(e => e.email.includes(emailParaChecar))
        let indice = i

        console.log(listaUsuarios)
        console.log(cpfParaChecar)
        console.log(emailParaChecar)
        console.log(senhaParaAlterar)

        if ((validarLoginCpf.length !== 1) && (validarLoginEmail.length !== 1)) {

            alert("Os campos foram preenchidos incorretamente!")

        } else {
            
            usuarios[indice].senha = senhaParaAlterar.value;
            console.log(usuarios)
            alert("Senha alterada com sucesso!")
            localStorage.setItem("usuários", JSON.stringify(usuarios))
            window.location.href = "loginUsuario.html"
        }
    }
}

//Função para voltar para pagina anterior
function voltar() {
    window.history.back()
}
