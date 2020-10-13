//Funcao para criar lista de produtos cadastrados
var listaProdutos = []
var listaDeProdutosObjeto = []

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

    //validar entrada de dados
    if ((produto.value !== "") || (listaProdutos.includes(produto.value) !== true)) {
        var produtoExistente = document.getElementsByName('listaProdutos')[0]
            produtoExistente.addEventListener('input', function() {
                listaProdutos.push(this.value)
            })
    }

    if (produto.value == "") {
        document.getElementById("produtoValidar").innerHTML = `O campo produto está em branco!`
    } 
    if (dataCompraProduto.value == "") {
        document.getElementById("dataCompraProdutoValidar").innerHTML = `O campo data da compra está em branco!`
    }

    if (estabelecimentoProduto.value == "") {
        document.getElementById("estabelecimentoProdutoValidar").innerHTML = `O campo estabelecimento não foi selecionado!`
    }

    if (bairroProduto.value == "") {
        document.getElementById("bairroProdutoValidar").innerHTML = `O campo bairro não foi selecionado!`
    }

    if (valorProduto.value == "") {
        document.getElementById("valorProdutoValidar").innerHTML = `O campo valor unitário está em branco!`
    }

    //Fazer a validação das validações para rodar a função construtura e dar push no array
    if ((produto.value !== "") && (dataCompraProduto.value !== "") && (estabelecimentoProduto.value !== "") && (bairroProduto.value !== "") && (valorProduto.value !== "")) {

        let novoCadastroProduto = new criaProduto(produto.value, dataCompraProduto.value, estabelecimentoProduto.value, bairroProduto.value, valorProduto.value)
        listaProdutos.push(produto.value)
        listaDeProdutosObjeto.push(novoCadastroProduto)
        alert("Produto inserido com sucesso!")
        localStorage.setItem("listaTodosProdutos", JSON.stringify(listaProdutos))
        localStorage.setItem("cadastros", JSON.stringify(listaDeProdutosObjeto))
    }

    //limpar campos para facilitar a add do próximo produto
    document.getElementById("produtoInserido").value = ' '
    document.getElementById("dataCompra").value = ' '
    document.getElementById("estabelecimentoProduto").value = ' '
    document.getElementById("bairroProduto").value = ' '
    document.getElementById("valorProduto").value = ' '
}

//funcao que gera a lista de produtos dentro da célula, na coluna 'produtos'
let lista = JSON.parse(localStorage.getItem("listaTodosProdutos"))

function gerarListaProdutos() {
    if (lista) {
        for (i = 0; i < lista.length; i++) {
            var opcao = document.createElement('option')
            opcao.setAttribute('value', `${lista[i]}`)
            document.getElementById('listaProdutos').appendChild(opcao)
        }
    }
}

