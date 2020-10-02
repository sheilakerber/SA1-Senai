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
        alert ("O campo nome está em branco!")
         
    }


    //validar e-mail (Se está em branco ou já foi cadastrado)
    if (email.value == "") {
        alert ("O campo e-mail está em branco!")
             
    }
    //validar cpf
    if (cpf == "") {
        console.log("O campo CPF está em branco!")
    } else {
        verificarCpf()
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
            console.log("CPF NÃO VÁLIDO")

        }
    }

    //validar nascimento (Se está em branco)
    if (nascimento.value == "") {
        alert("O campo data de nascimento está em branco")
    
        } else {
            console.log ("Data de nascimento OK!")
    }

     //validar bairro (Se está em branco)
    if (bairro.value == "") {
        alert("O campo bairro está em branco")

        } else {
        console.log ("Bairro OK!")
    }   


    //validacao da senha
    if (senha.value == senhaConfirmacao.value) {
        console.log("Senhas validas!")
    } else {
        alert("Senhas incompatíveis!")
    }


    //Fazer a validação das validações para rodar a função construtura e dar push no array
    if ((nome.value !== "") && (nascimento.value !== "") && (email.value !== "") && (nascimento.value !== "") && (bairro.value !== "") && (verificarCpf()== true)) {

        let novoUsuario = new criaUsuario(nome.value, nascimento.value, cpf.value, email.value, senha.value, bairro.value)
        usuarios.push(novoUsuario)
        alert("Usuário cadastrado com sucesso!")
        localStorage.setItem("usuários", JSON.stringify(usuarios))
    }

    document.getElementById("nomeUsuario").value = ' '
    document.getElementById("nascimentoUsuario").value = ' '
    document.getElementById("cpfUsuario").value = ' '
    document.getElementById("emailUsuario").value = ' '
    document.getElementById("senhaUsuario").value = ' '
    document.getElementById("confirmaSenhaUsuario").value = ' '
    document.getElementById("bairroUsuario").value = ' '

}
    

//Array para todos os estabelecimentos cadastrados
var estabelecimentos = []

//pega os dados do html


//cria um novo


    //Fazer a validação das validações para rodar a função construtura e dar push no array