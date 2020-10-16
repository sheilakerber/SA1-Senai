//Array para todos os estabelecimentos cadastrados
var listaEstabelecimentos = []
var listaDeEstabelecimentosObjeto = []

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
    if (estabelecimento.value == '') {
        document.getElementById("estabelecimentoValidar").innerHTML =`O campo estabelecimento está em branco!`
    }

    if ((cep.value == "" && cep.value.length !== 8)) {
        document.getElementById("cepValidar").innerHTML = `O campo CEP está em branco!`
    } else if (cep.value.length !== 8) {
        document.getElementById("cepValidar").innerHTML = `O campo CEP deve conter 8 números!`
    }

    if (contato.value == "") {
        document.getElementById("contatoValidar").innerHTML = `O campo contato está em branco!`
    }

    if ((bairroMercado.value == "") || (dataBairros.includes(bairroMercado.value) !== true)) {
        document.getElementById("bairroEstabelecimentoValidar").innerHTML = `O campo bairro não foi selecionado!`
    }

    //Fazer a validação das validações para rodar a função construtura e dar push no array
    if ((estabelecimento.value !== "") && (cep.value !== "") && (cep.value.length == 8) && (contato.value !== "") && (bairroMercado.value !== "") && (dataBairros.includes(bairroMercado.value) == true) && (bairroMercado.value !== null)) {

        let novoEstabelecimento = new criaEstabelecimento(estabelecimento.value, cep.value, contato.value, bairroMercado.value)
        listaEstabelecimentos.push(document.getElementById("nomeEstabelecimento").value)
        listaDeEstabelecimentosObjeto.push(novoEstabelecimento)
        alert("Estabelecimento cadastrado com sucesso!")
        localStorage.setItem("listaTodosEstabelecimentos", JSON.stringify(listaEstabelecimentos))
        localStorage.setItem("estabelecimentos", JSON.stringify(listaDeEstabelecimentosObjeto))
    }

    document.forms[0].reset();

}


let listaDeEstabelecimentos = JSON.parse(localStorage.getItem("listaTodosEstabelecimentos"))

function gerarListaEstabelecimentos() {
    
    console.log(listaDeEstabelecimentos)
    if (listaDeEstabelecimentos)
        for (i = 0; i < listaDeEstabelecimentos.length; i++) {
            var opcao = document.createElement('option')
            opcao.setAttribute('value', `${listaDeEstabelecimentos[i]}`)

            document.getElementById('listaEstabelecimentos').appendChild(opcao)
        }

}