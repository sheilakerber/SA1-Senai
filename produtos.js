//array contendo os tipos de produtos cadastraveis no sistema
var dataProduto = ["Açúcar refinado", "Arroz", "Azeite", "Café", "Farinha", "Feijão", "Leite", "Macarrão", "Óleo", "Sal", "Vinagre"]

//funcao que cria a lista de produtos disponiveis em criarLista.html a partir daqueles cadastrados em inserirProduto.html
function gerarTiposProdutos() {
    let listaTodosProdutos = JSON.parse(localStorage.getItem("listaTodosProdutos"))
    for (i = 0; i < listaTodosProdutos.length; i++) {
        var opcao = document.createElement('option')
        opcao.setAttribute('value', `${listaTodosProdutos[i]}`)
        document.getElementById('listaProdutos').appendChild(opcao)
    }
}

//pega os dados do html
var dataCompraProduto = document.getElementById("dataCompra")
var produto = document.getElementById("produtoInserido")
var marcaProduto = document.getElementById("marcaProdutoInserido")
var volumePesoProduto = document.getElementById("volumePesoProdutoInserido")
var estabelecimentoProduto = document.getElementById("estabelecimentoProduto")
var bairroProduto = document.getElementById("bairroProduto")
var valorProduto = document.getElementById("valorProduto")

//cria um novo produto
function criaProduto(dataCompraProduto, produto, marcaProduto, volumePesoProduto, estabelecimentoProduto, bairroProduto, valorProduto) {
    this.dataCompraProduto = dataCompraProduto
    this.produto = produto
    this.marcaProduto = marcaProduto
    this.volumePesoProduto = volumePesoProduto
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

        let novoCadastroProduto = new criaProduto(dataCompraProduto.value, produto.value, marcaProduto.value, volumePesoProduto.value, estabelecimentoProduto.value, bairroProduto.value, valorProduto.value)

        listaTodosProdutos.push(produto.value)
        listaCadastros.push(novoCadastroProduto)

        //ordenar os produtos alfabeticamente
        listaCadastros.sort(dynamicSort("produto"))

        localStorage.setItem("listaTodosProdutos", JSON.stringify(listaTodosProdutos))
        localStorage.setItem("cadastros", JSON.stringify(listaCadastros))

        //limpar campos para facilitar a add do próximo produto
        document.forms[0].reset();
        document.getElementById("produtoValidar").innerHTML = ' '
        document.getElementById("marcaProdutoValidar").innerHTML = ' '
        document.getElementById("pesoVolumeProdutoValidar").innerHTML = ' '
        document.getElementById("dataCompraProdutoValidar").innerHTML = ' '
        document.getElementById("estabelecimentoProdutoValidar").innerHTML = ' '
        document.getElementById("bairroProdutoValidar").innerHTML = ' '
        document.getElementById("valorProdutoValidar").innerHTML = ' '

        alert("Produto inserido com sucesso!")
        window.location.href = "inserirProduto.html"
        }
}

//funcao que ordena a lista
//Ref:<https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript>
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function(a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}