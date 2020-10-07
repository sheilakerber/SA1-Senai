// var produtosDisponiveisSistema = ["Arroz tipo 1 5Kg", "Arroz tipo 1 2Kg", "Sal 1Kg", "Açúcar refinado 5Kg", "Açúcar refinado 1Kg", "Farinha de trigo 5Kg", "Farinha de trigo 1Kg", "Óleo de soja 900mL", "Feijão 1Kg", "Café moído 230g"]


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
    if ((produto.value == "") || (listaProdutos.includes(produto.value) !== true)) {
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

        let novoCadastroProduto = new criaProduto(produto.value, dataCompraProduto.value, estabelecimentoProduto.value, bairroProduto.value, valorProduto.value)
        listaProdutos.push(novoCadastroProduto.produto)
        alert("Produto inserido com sucesso!")
        localStorage.setItem("novoCadastroProduto", JSON.stringify(novoCadastroProduto))
    }

    //limpar campos para facilitar a add do próximo produto
    document.getElementById("produtoInserido").value = ' '
    document.getElementById("dataCompra").value = ' '
    document.getElementById("estabelecimentoProduto").value = ' '
    document.getElementById("bairroProduto").value = ' '
    document.getElementById("valorProduto").value = ' '

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
    listaProdutos.push(novoCadastroProduto.produto)
    for (i = 0; i < listaProdutos.length; i++) {
        opcao = document.createElement('option')
        opcao.setAttribute('value', `${listaProdutos[i]}`)
        document.getElementById('listaProdutos').appendChild(opcao)

    }
}