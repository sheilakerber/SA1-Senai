//array para armazenar todos os usuarios cadastrados
var usuarios = []
var dataBairros = ["Agronômica", "Armação do Pântano do Sul", "Balneário", "Barra da Lagoa", "Bom Abrigo", "Cachoeira do Bom Jesus", "Cacupé", "Campeche", "Canasvieiras", "Capoeiras", "Carianos", "Carvoeira", "Centro","Coqueiros", "Córrego Grande", "Costeira do Pirajubaé", "Daniela", "Estreito", "Ingleses do Rio Vermelho", "Itacorubi", "Itaguaçu", "Jardim Atlântico", "João Paulo", "José Mendes", "Jurerê Internacional", "Jurerê Tradicional", "Lagoa da Conceição", "Monte Verde", "Pantanal", "Pântano do Sul", "Ponta das Canas", "Praia Brava",  "Ribeirão da Ilha", "Rio Tavares", "Rio Vermelho", "Saco dos Limões", "Saco Grande", "Sambaqui", "Santa Mônica", "Santo Antônio de Lisboa", "Tapera", "Trindade"]

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
        alert ("O campo nome está em branco!") 
    }

    //validar nascimento (Se está em branco)
    if (nascimento.value == "") {
        alert("O campo data de nascimento está em branco")
    }

    //validar se o campo cpf esta vazio e se esta correto
    if (cpf == "") {
        alert("O campo CPF está em branco!")

    } else {
        verificarCpf()

    }
     //validar se o cpf já não foi cadastrado
    if ((cpf !== '') && (verificarCpf() == true)) {
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
            console.log("CPF invalido!")
        }
    }

    //validar se o cpf já foi cadastrado
    function compararCpfs() {

        let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))
        console.log(listaUsuarios)

        for (i = 0; i < usuarios.length; i++) {
            
        let numeroCpf = cpf.value
        var validarCpf = listaUsuarios.filter( c => c.cpf.includes(numeroCpf))
        console.log(validarCpf)
            if(validarCpf.length == 1) {
            alert("Esse CPF já foi cadastrado!")
            return false
            }
        }

    }

    //validar se o e-mail está em branco
    if (email.value == "") {
        alert("O campo e-mail está em branco!")      
    } else {
        validarEmail(email)
    }

    //validar se o e-mail o e-mail esta escrito corretamente
    if ((email !== '') && (validarEmail(email) == false)) {
        alert("E-mail invalido!")
    } 

    //validacao da senha
    if (senha.value !== senhaConfirmacao.value) {
        alert("Senhas incompatíveis!")
    }

    //função validar expressão do e-mail
    function validarEmail(email) {
        var emailCheck = email.value;
        var filtro = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if(filtro.test(emailCheck)) {
            return true;
        } else {
            return false;
        }
    }

     //validar bairro (Se está em branco)
     if ((bairro.value == "") || (dataBairros.includes(bairro.value) !== true)) {
        alert("O campo bairro não foi selecionado!")
    }
    if (bairro.value == null) {
        alert("O campo bairro não foi selecionado!")
    } 

    //Fazer a validação das validações para rodar a função construtura e dar push no array
    if ((nome.value !== "") && (nascimento.value !== "") && (compararCpfs() !== false) && (verificarCpf() == true) && ((email.value !== "") && (validarEmail(email) == true)) && (senha.value == senhaConfirmacao.value) && (bairro.value !== "") && (dataBairros.includes(bairro.value) == true) && (bairro.value !== null)) {

        let novoUsuario = new criaUsuario(nome.value, nascimento.value, cpf.value, email.value, senha.value, bairro.value)
        usuarios.push(novoUsuario)
        alert("Usuário cadastrado com sucesso!")
        localStorage.setItem("usuários", JSON.stringify(usuarios))
    }
    //limpar campos
    document.getElementById("nomeUsuario").value = ' '
    document.getElementById("nascimentoUsuario").value = ' '
    document.getElementById("cpfUsuario").value = ' '
    document.getElementById("emailUsuario").value = ' '
    document.getElementById("senhaUsuario").value = ' '
    document.getElementById("confirmaSenhaUsuario").value = ' '
    document.getElementById("bairroUsuario").value = null

}
    

//Array para todos os estabelecimentos cadastrados
var estabelecimentos = []

//pega os dados do html
var estabelecimento = document.getElementById("nomeEstabelecimento")
var cep = document.getElementById("cepEstabelecimento")
var contato = document.getElementById("contatoEstabelecimento")
var bairroMercado = document.getElementById("bairroEstabelecimento")

//cria um novo estabelecimento
function criaEstabelecimento(estabelecimento, cep, contato, bairroMercado) {
    this.estabelecimento = estabelecimento
    this.cep = cep
    this.contato = contato
    this.bairroMercado = bairroMercado
}
//adicionar novo estabelecimento no Array estabelecimentos []
function cadastrarEstabelecimento() {
    
//validar cadastro
    if (estabelecimento.value == "") {
        alert("O campo estabelecimento está em branco!")
    }

    if (cep.value == "") {
        alert("O campo CEP está em branco!")
    }
    if (cep.value.length !== 7) {
        alert("O campo CEP deve conter 7 números!")
    }

    if (contato.value == "") {
        alert("O campo contato está em branco!")
    }

    if ((bairroMercado.value == "") || (dataBairros.includes(bairroMercado.value) !== true)) {
        alert("O campo bairro não foi selecionado!")
    }
   
    //Fazer a validação das validações para rodar a função construtura e dar push no array
    if ((estabelecimento.value !== "") && (cep.value !== "") && (cep.value.length == 7) && (contato.value !== "") && (bairroMercado.value !== "") && (dataBairros.includes(bairroMercado.value) == true) && (bairroMercado.value !== null)) {

        let novoEstabelecimento = new criaEstabelecimento(estabelecimento.value, cep.value, contato.value, bairroMercado.value)
        estabelecimentos.push(novoEstabelecimento)
        alert("Estabelecimento cadastrado com sucesso!")
        localStorage.setItem("estabelecimentos", JSON.stringify(estabelecimentos))
    }

    document.getElementById("nomeEstabelecimento").value = ' '
    document.getElementById("cepEstabelecimento").value = ' '
    document.getElementById("contatoEstabelecimento").value = ' '
    document.getElementById("bairroEstabelecimento").value = null

}

//Função para logar
function login(){
    
    let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))
    let loginCpf = document.getElementById("loginCpf").value
    let loginSenha = document.getElementById("loginSenha").value
    //For para validação de login corret ou incorreto
    for(i=0; i < listaUsuarios.length; i++) {
        
        let validarLoginCpf = listaUsuarios.filter( l => l.cpf.includes(loginCpf))
        let validarLoginSenha = listaUsuarios.filter( s => s.senha.includes(loginSenha))
        console.log(validarLoginCpf)
        console.log(validarLoginSenha)
        //Construir validação
        if((validarLoginCpf.length == 1) && (validarLoginSenha.length == 1)) { 
            alert("Logado!")
        } else {
            alert("CPF e/ou senha estão incorreto!")
        }   
    }

}

//Função para voltar para pagina anterior
function voltar() {
    window.history.back()
}

    //delimitar no html min e max tamanho dos campos 
            //maxlenght=""     minlenght=""