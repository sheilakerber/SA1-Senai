var dataProduto = ["Açúcar refinado", "Arroz", "Azeite", "Café", "Farinha", "Feijão", "Leite", "Macarrão", "Óleo", "Sal", "Vinagre"]

function gerarTiposProdutos() {
    for (i = 0; i < dataProduto.length; i++) {
        var opcao = document.createElement('option')
        opcao.setAttribute('value', `${dataProduto[i]}`)
        document.getElementById('listaProdutos').appendChild(opcao)
    }
}

//pega os dados do html
var produto = document.getElementById("produtoInserido")
var marcaProduto = document.getElementById("marcaProdutoInserido")
var volumePesoProduto = document.getElementById("volumePesoProdutoInserido")
var dataCompraProduto = document.getElementById("dataCompra")
var estabelecimentoProduto = document.getElementById("estabelecimentoProduto")
var bairroProduto = document.getElementById("bairroProduto")
var valorProduto = document.getElementById("valorProduto")

//cria um novo produto
function criaProduto(produto, marcaProduto, volumePesoProduto, dataCompraProduto, estabelecimentoProduto, bairroProduto, valorProduto) {
    this.produto = produto
    this.marcaProduto = marcaProduto
    this.volumePesoProduto = volumePesoProduto
    this.dataCompraProduto = dataCompraProduto
    this.estabelecimentoProduto = estabelecimentoProduto
    this.bairroProduto = bairroProduto
    this.valorProduto = valorProduto
}

//adicionar novo produto ao Array listaProdutos[]
function inserirProduto() {

    let listaTodosProdutos = JSON.parse(localStorage.getItem("listaTodosProdutos"))
    let listaCadastros = JSON.parse(localStorage.getItem("cadastros"))

    if (!listaTodosProdutos) {
        listaTodosProdutos = [] // primeira vez que usa, se não for válido, seta para array vazio
    }

    if (!listaCadastros) {
        listaCadastros = [] // primeira vez que usa, se não for válido, seta para array vazio
    }

    //variavel para validar se existem campos vazios
    let todosInputsCompletos = true

    if (produto.value == "") {
        document.getElementById("produtoValidar").innerHTML = `O campo produto está em branco!`
        todosInputsCompletos = false
    }
    if (marcaProduto.value == "") {
        document.getElementById("marcaProdutoValidar").innerHTML = `O campo marca está em branco!`
        todosInputsCompletos = false
    }
    if (volumePesoProduto.value == "") {
        document.getElementById("pesoVolumeProdutoValidar").innerHTML = `O campo volume/peso está em branco!`
        todosInputsCompletos = false
    }

    if (dataCompraProduto.value == "") {
        document.getElementById("dataCompraProdutoValidar").innerHTML = `O campo data da compra está em branco!`
        todosInputsCompletos = false
    }

    if (estabelecimentoProduto.value == "") {
        document.getElementById("estabelecimentoProdutoValidar").innerHTML = `O campo estabelecimento não foi selecionado!`
        todosInputsCompletos = false
    }

    if (bairroProduto.value == "") {
        document.getElementById("bairroProdutoValidar").innerHTML = `O campo bairro não foi selecionado!`
        todosInputsCompletos = false
    }

    if (valorProduto.value == "") {
        document.getElementById("valorProdutoValidar").innerHTML = `O campo valor unitário está em branco!`
        todosInputsCompletos = false
    }

    //Fazer a validação das validações para rodar a função construtura e dar push no array
    if (todosInputsCompletos) {

        let novoCadastroProduto = new criaProduto(produto.value, dataCompraProduto.value, estabelecimentoProduto.value, bairroProduto.value, valorProduto.value)

        listaTodosProdutos.push(produto.value)
        listaCadastros.push(novoCadastroProduto)

        localStorage.setItem("listaTodosProdutos", JSON.stringify(listaTodosProdutos))
        localStorage.setItem("cadastros", JSON.stringify(listaCadastros))

        alert("Produto inserido com sucesso!")
    }

    //limpar campos para facilitar a add do próximo produto
    document.getElementById("produtoInserido").value = ' '
    document.getElementById("produtoValidar").innerHTML = ' '

    document.getElementById("dataCompra").value = ' '
    document.getElementById("dataCompraProdutoValidar").innerHTML = ' '

    document.getElementById("estabelecimentoProduto").value = ' '
    document.getElementById("estabelecimentoProdutoValidar").innerHTML = ' '

    document.getElementById("bairroProduto").value = ' '
    document.getElementById("bairroProdutoValidar").innerHTML = ' '

    document.getElementById("valorProduto").value = ' '
    document.getElementById("valorProdutoValidar").innerHTML = ' '

}

//funcao que gera a lista de produtos dentro da célula, na coluna 'produtos'
function gerarListaProdutos() {
    let lista = JSON.parse(localStorage.getItem("listaTodosProdutos"))
    if (lista) {
        for (i = 0; i < lista.length; i++) {
            var opcao = document.createElement('option')
            opcao.setAttribute('value', `${lista[i]}`)
            document.getElementById('listaProdutos').appendChild(opcao)
        }
    }
}