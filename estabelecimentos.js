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
        listaEstabelecimentos.push(document.getElementById("nomeEstabelecimento").value)
        listaDeEstabelecimentosObjeto.push(novoEstabelecimento)
        alert("Estabelecimento cadastrado com sucesso!")
        localStorage.setItem("listaTodosEstabelecimentos", JSON.stringify(listaEstabelecimentos))
        localStorage.setItem("estabelecimentos", JSON.stringify(listaDeEstabelecimentosObjeto))
    }

    document.getElementById("nomeEstabelecimento").value = ' '
    document.getElementById("cepEstabelecimento").value = ' '
    document.getElementById("contatoEstabelecimento").value = ' '
    document.getElementById("bairroEstabelecimento").value = null

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