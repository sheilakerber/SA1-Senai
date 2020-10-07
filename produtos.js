//Funcao para criar lista de produtos cadastrados
var listaProdutos = []
var listaoDeProdutos = []

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
        listaProdutos.push(document.getElementById("produtoInserido").value)
        alert("Produto inserido com sucesso!")
        localStorage.setItem("testando", JSON.stringify(listaProdutos))
        localStorage.setItem("novoCadastroProduto", JSON.stringify(novoCadastroProduto))
        //para esse segundo localstorage funcionar(criar um array de objetos com todos os produtos+atributos), talvez seja necessario clonar o "novoCadastroProduto" e fazer um push pro para cada um dos VAR's lá em cima

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
let lista = JSON.parse(localStorage.getItem("testando"))
function gerarListaProdutos() {
  
    var opcao;
        console.log(lista)
    for (i = 0; i < lista.length; i++) {
        console.log(lista)
        opcao = document.createElement('option')
        opcao.setAttribute('value', `${lista[i]}`)
        document.getElementById('listaProdutos').appendChild(opcao)
        
    }
}
