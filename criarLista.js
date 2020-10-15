//funcao que gera a lista de produtos a partir dos itens cadastrados no local storage
function gerarListaProdutos() {
    var lista = JSON.parse(localStorage.getItem("listaTodosProdutos"))

    if (lista) {
        //filtra a lista para não repetir o tipo de produto
        var listaFiltrada = lista.filter(function(elem, index, lista) {
            return lista.indexOf(elem) === index;
        });

        //insere os itens filtrados na lista
        for (i = 0; i < listaFiltrada.length; i++) {
            var opcao = document.createElement('option')
            opcao.setAttribute('value', `${listaFiltrada[i]}`)
            document.getElementById('listaProdutos').appendChild(opcao)
        }
    }
}

//array contendo somente os itens escolhidos pelo usuário
var produtosListaFinal = []

//funcao que mostra os itens escolhidos na tela, conforme o usuário escolhe os produtos
function pesquisarItemLista() {
    //limpar array antes de inserir proximo produto
    produtosListaFinal = []

    var novoProduto = document.getElementById("produtoSelecionado").value

    if (novoProduto == "") {
        alert("Por favor, selecione um produto!")
    } else {
        if (produtosListaFinal.includes(novoProduto)) {
            alert("Este produto já foi adicionado à lista!")
        } else {
            produtosListaFinal.push(novoProduto)
        }
    }
    //forma mais simples de resetar todos os campos
    document.forms[0].reset();

    gerarTabelaComparativa()
}

//array para guardar somente os itens escolhidos pelo usuario
let produtosInseridosUsuario = []

//array que guarda os produtos filtrados pelo tipo de produto da lista
var produtosSelecionados

function gerarTabelaComparativa() {
    //limpa o html para não sobrescrever resultados
    document.getElementById("idTabelaHtml").innerHTML = ""

    //pega todos os produtos salvos no local storage
    var arrayObjetosLista = JSON.parse(localStorage.getItem("cadastros"))

    if (arrayObjetosLista) {
        //filtro para pegar apenas os objetos da lista criada pelo usuario
        produtosSelecionados = arrayObjetosLista.filter(objeto => produtosListaFinal.includes(objeto.produto))

        //geração da tabela no html
        let table = document.querySelector("table");
        let data = Object.keys(produtosSelecionados[0]);

        generateTableHead(table, data);
        generateTable(table, produtosSelecionados);
    } else {
        alert("Nenhum produto cadastrado")
    }
}

//   TABELA que COMPARA os PRECOS  Referencia: https://www.valentinog.com/blog/html-table/
function generateTableHead(table) {
    var nomeColunas = ["Data Compra", "Produto", "Marca", "Peso/Volume", "Estabelecimento", "Valor (R$)", "Selecione"]
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of nomeColunas) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

var idRow
var novoArrayListaCompras = []

function generateTable(table, arrayObjetosSelecionados) {
    for (let compra of arrayObjetosSelecionados) {
        let row = table.insertRow();

        let cellDataCompra = row.insertCell();
        let textDataCompra = document.createTextNode(compra.dataCompraProduto)
        cellDataCompra.appendChild(textDataCompra)

        let cellProduto = row.insertCell();
        let textProduto = document.createTextNode(compra.produto)
        cellProduto.appendChild(textProduto)

        let cellMarca = row.insertCell();
        let textMarca = document.createTextNode(compra.marcaProduto)
        cellMarca.appendChild(textMarca)

        let cellPesoVolume = row.insertCell();
        let textPesoVolume = document.createTextNode(compra.volumePesoProduto)
        cellPesoVolume.appendChild(textPesoVolume)

        let cellEstabelecimento = row.insertCell();
        let textEstabelecimento = document.createTextNode(compra.estabelecimentoProduto)
        cellEstabelecimento.appendChild(textEstabelecimento)

        let cellValor = row.insertCell();
        let textValor = document.createTextNode(compra.valorProduto)
        cellValor.appendChild(textValor)

        //cria o checkbox
        var checkSign = document.createElement('input')

        //var idCheck
        checkSign.setAttribute('type', "checkbox")
        checkSign.setAttribute('name', "nomeCheckbox")
        checkSign.setAttribute('id', `${arrayObjetosSelecionados.indexOf(compra)}`)
            //console.log("arrayObjetosSelecionados.indexOf(compra) ", arrayObjetosSelecionados.indexOf(compra));

        //insere o checkbox dentro da tabela
        let cellCheckBox = row.insertCell();
        cellCheckBox.appendChild(checkSign)

        idRow = arrayObjetosSelecionados.indexOf(compra)
    }
}

//novo array contendo a lista final do consumidor
var objListaFinal = []

function produtosChecked() {
    //pegar tabela
    var getTable = document.getElementById("idTabelaHtml")

    //get checked 
    var checkBoxes = getTable.getElementsByTagName("input")

    for (i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            var row = checkBoxes[i].parentNode.parentNode
                //listaInnerHtml += row.cells[i].innerHTML

            //pega o conteudo das celulas dos itens selecionados
            var cells = row.getElementsByTagName("td")
                // console.log("cells ", cells[0].innerText);
                // console.log("cells ", cells[1].innerText);
                // console.log("cells ", cells[2].innerText);
                // console.log("cells ", cells[3].innerText);
                // console.log("cells ", cells[4].innerText);
                // console.log("cells ", cells[5].innerText);
                // console.log("cells ", cells[6].innerText);

            var tempObjeto = {}
            tempObjeto.Produto = cells[1].innerText
            tempObjeto.Marca = cells[2].innerText
            tempObjeto.PesoVolume = cells[3].innerText
            tempObjeto.Estabelecimento = cells[4].innerText
            tempObjeto.Valor = cells[5].innerText

            objListaFinal.push(tempObjeto)
            console.log("objListaFinal: ", objListaFinal);
            localStorage.setItem("ListaFinal", JSON.stringify(objListaFinal))

        }
    }
    listaPreview()
}

function reiniciarLista() {
    //limpa o html para não sobrescrever resultados
    document.getElementById("idTabelaHtml").innerHTML = ""
    document.getElementById('tabelaPreview').innerHTML = ""
    //limpar array produtosListaFinal
    produtosListaFinal = []
}

function listaPreview() {
    document.getElementById('tabelaPreview').innerHTML = ""

    var listapreview = JSON.parse(localStorage.getItem("ListaFinal"))
    console.log('listapreview', listapreview)

    table = document.getElementById('tabelaPreview')

    let dataPreview = ["Produto", "Marca", "Peso/Volume", "Estabelecimento", "Valor (R$)"]

    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of dataPreview) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }

    function generateTablePreview(table, arrayObjetosSelecionados) {
        for (let compra of arrayObjetosSelecionados) {
            let row = table.insertRow();
    
            let cellProduto = row.insertCell();
            let textProduto = document.createTextNode(compra.Produto)
            cellProduto.appendChild(textProduto)
    
            let cellMarca = row.insertCell();
            let textMarca = document.createTextNode(compra.Marca)
            cellMarca.appendChild(textMarca)
    
            let cellPesoVolume = row.insertCell();
            let textPesoVolume = document.createTextNode(compra.PesoVolume)
            cellPesoVolume.appendChild(textPesoVolume)
    
            let cellEstabelecimento = row.insertCell();
            let textEstabelecimento = document.createTextNode(compra.Estabelecimento)
            cellEstabelecimento.appendChild(textEstabelecimento)
    
            let cellValor = row.insertCell();
            let textValor = document.createTextNode(compra.Valor)
            cellValor.appendChild(textValor)

        }
    }
    generateTablePreview(table, listapreview)
}