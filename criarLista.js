var indice

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
function addItemLista() {
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

    finalizarLista()

}

let produtosInseridosUsuario = [] //array para guardar somente os itens escolhidos pelo usuario
var produtosSelecionados //array que guarda os produtos filtrados pelo tipo de produto da lista

function finalizarLista() {
    //limpa o html para não sobrescrever resultados
    document.getElementById("listaFinal").innerHTML = ""
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
            //console.log(arrayObjetosSelecionados.indexOf(compra));
    }
}

//novo array contendo a lista final do consumidor
var objListaFinal = []

//nosso obj temporario
var tempObjeto = {
    Produto: "temp",
    Marca: "temp",
    PesoVolume: "temp",
    Estabelecimento: "temp",
    Valor: "temp"
}

function produtosChecked() {
    //pegar tabela
    var getTable = document.getElementById("idTabelaHtml")

    //get checked 
    var checkBoxes = getTable.getElementsByTagName("input")

    //onde a lista vai aparecer
    var listaInnerHtml = document.getElementById("testeCheck")

    for (i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            var row = checkBoxes[i].parentNode.parentNode
            listaInnerHtml += row.cells[i].innerHTML

            //pega o conteudo das celulas dos itens selecionados
            var cells = row.getElementsByTagName("td")
            console.log("cells ", cells[0].innerText);
            console.log("cells ", cells[1].innerText);
            console.log("cells ", cells[2].innerText);
            console.log("cells ", cells[3].innerText);
            console.log("cells ", cells[4].innerText);
            console.log("cells ", cells[5].innerText);
            console.log("cells ", cells[6].innerText);

            //document.getElementById("testeCheck").innerHTML += cells[1].innerText + cells[2].innerText + cells[3].innerText + cells[4].innerText + cells[5].innerText + '<br>'

            tempObjeto.Produto = cells[1].innerText
            tempObjeto.Marca = cells[2].innerText
            tempObjeto.PesoVolume = cells[3].innerText
            tempObjeto.Estabelecimento = cells[4].innerText
            tempObjeto.Valor = cells[5].innerText

            objListaFinal.push(tempObjeto)

        }
    }
    console.log("objListaFinal ", JSON.stringify(objListaFinal))
}





function reiniciarLista() {
    //limpa o html para não sobrescrever resultados
    document.getElementById("listaFinal").innerHTML = ""
    document.getElementById("idTabelaHtml").innerHTML = ""

    //limpar array produtosListaFinal
    produtosListaFinal = []
}