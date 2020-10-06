//array para armazenar todos os usuarios cadastrados
<<<<<<< Updated upstream
var usuarios = []
=======
let usuarios = []
>>>>>>> Stashed changes
var dataBairros = ["Agronômica", "Armação do Pântano do Sul", "Balneário", "Barra da Lagoa", "Bom Abrigo", "Cachoeira do Bom Jesus", "Cacupé", "Campeche", "Canasvieiras", "Capoeiras", "Carianos", "Carvoeira", "Centro", "Coqueiros", "Córrego Grande", "Costeira do Pirajubaé", "Daniela", "Estreito", "Ingleses", "Itacorubi", "Itaguaçu", "Jardim Atlântico", "João Paulo", "José Mendes", "Jurerê Internacional", "Jurerê Tradicional", "Lagoa da Conceição", "Monte Verde", "Pantanal", "Pântano do Sul", "Ponta das Canas", "Praia Brava", "Ribeirão da Ilha", "Rio Tavares", "Rio Vermelho", "Saco dos Limões", "Saco Grande", "Sambaqui", "Santa Mônica", "Santo Antônio de Lisboa", "Tapera", "Trindade"]
var produtosDisponiveisSistema = ["Arroz tipo 1 5Kg", "Arroz tipo 1 2Kg", "Sal 1Kg", "Açúcar refinado 5Kg", "Açúcar refinado 1Kg", "Farinha de trigo 5Kg", "Farinha de trigo 1Kg", "Óleo de soja 900mL", "Feijão 1Kg", "Café moído 230g"]

//pega os dados do html
var nome = document.getElementById("nomeUsuario")
var nascimento = document.getElementById("nascimentoUsuario")
var cpf = document.getElementById("cpfUsuario")
var email = document.getElementById("emailUsuario")
var senha = document.getElementById("senhaUsuario")
var senhaConfirmacao = document.getElementById("confirmaSenhaUsuario")
var bairro = document.getElementById("usuarioBairro")

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
    if (cep.value.length !== 8) {
        alert("O campo CEP deve conter 8 números!")
    }

    if (contato.value == "") {
        alert("O campo contato está em branco!")
    }

    if ((bairroMercado.value == "") || (dataBairros.includes(bairroMercado.value) !== true)) {
        alert("O campo bairro não foi selecionado!")
    }

    //Fazer a validação das validações para rodar a função construtura e dar push no array
    if ((estabelecimento.value !== "") && (cep.value !== "") && (cep.value.length == 8) && (contato.value !== "") && (bairroMercado.value !== "") && (dataBairros.includes(bairroMercado.value) == true) && (bairroMercado.value !== null)) {

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

//Função para voltar para pagina anterior
function voltar() {
    window.history.back()
}

//Funcao para criar lista de produtos cadastrados
var listaProdutos = []

//pega os dados do html
var produto = document.getElementById("produtoInserido")
var dataCompraProduto = document.getElementById("dataCompra")
var estabelecimentoProduto = document.getElementById("estabelecimentoProduto")
var bairroProduto = document.getElementById("bairroProduto")
var valorProduto = document.getElementById("valorProduto")

//cria um novo produto
function criaProduto(produto, dataCompraProduto, estabelecimentoProduto, bairroProduto, valorProduto) {
    this.produto = produto
    this.dataCompraProduto = dataCompraProduto
    this.estabelecimentoProduto = estabelecimentoProduto
    this.bairroProduto = bairroProduto
    this.valorProduto = valorProduto
}
//adicionar novo produto ao Array listaProdutos[]
function inserirProduto() {
    console.log("inicio funcao inserirProduto")

    //validar entrada de dados
    if ((produto.value == "") || (produtosDisponiveisSistema.includes(produto.value) !== true)) {
        alert("O campo Produto está em branco!")
    }

    if (dataCompraProduto.value == "") {
        alert("O campo Data da compra está em branco!")
    }

    if (estabelecimentoProduto.value == "") {
        alert("O campo Estabelecimento está em branco!")
    }

    if (bairroProduto.value == "") {
        alert("O campo bairro não foi selecionado!")
    }

    if (valorProduto.value == "") {
        alert("O campo Valor unitário está em branco!")
    }

    //Fazer a validação das validações para rodar a função construtura e dar push no array
    if ((produto.value !== "") && (dataCompraProduto.value !== "") && (estabelecimentoProduto.value !== "") && (bairroProduto.value !== "") && (valorProduto.value !== "")) {

        let novoProduto = new criaProduto(produto.value, dataCompraProduto.value, estabelecimentoProduto.value, bairroProduto.value, valorProduto.value)
        listaProdutos.push(novoProduto)
        alert("Produto inserido com sucesso!")
        localStorage.setItem("produtosInseridos", JSON.stringify(listaProdutos))
    }

    //limpar campos para facilitar a add do próximo produto
    document.getElementById("produtoInserido").value = ' '
    document.getElementById("dataCompra").value = ' '
    document.getElementById("estabelecimentoProduto").value = ' '
    document.getElementById("bairroProduto").value = ' '
    document.getElementById("valorProduto").value = ' '

}

//delimitar no html min e max tamanho dos campos 
//maxlenght=""     minlenght=""


function gerarBairros() {
    var opcao;
    console.log('OI')
    for(i=0; i<dataBairros.length; i++) {
        
        opcao = document.createElement('option')
        opcao.setAttribute('value', `${dataBairros[i]}`)
        
        document.getElementById('bairros').appendChild(opcao)
        
    }
}

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
            //
            usuarios[index].senha = senhaParaAlterar.value;
            console.log(usuarios)
            alert("Senha alterada com sucesso!")
            localStorage.setItem("usuários", JSON.stringify(usuarios))
            // window.location.href = "loginUsuario.html"
        }
    }
}


//funcao que gera a lista de bairros no html
function gerarBairros() {
    var opcao;
    for (i = 0; i < dataBairros.length; i++) {
        opcao = document.createElement('option')
        opcao.setAttribute('value', `${dataBairros[i]}`)
        document.getElementById('bairros').appendChild(opcao)
    }
}

//gerar nova linha na tabela para add outro item de compra
function gerarNovoItemTabela() {
    var table = document.getElementById("tabelaListaProdutos")
    var row = table.insertRow()
    row.insertCell(0).innerHTML = `<input list="listaProdutos"  id="listaProdutos" placeholder="Novo item"> `
        //chamando a funcao para mostrar a lista de produtos novamente
    document.getElementById("botaoAddNovoItem").addEventListener("onclick", gerarListaProdutos());
}

//funcao que gera a lista de produtos dentro da célula, na coluna 'produtos'
function gerarListaProdutos() {
    var opcao;
    for (i = 0; i < produtosDisponiveisSistema.length; i++) {
        opcao = document.createElement('option')
        opcao.setAttribute('value', `${produtosDisponiveisSistema[i]}`)
        document.getElementById('listaProdutos').appendChild(opcao)
    }
}