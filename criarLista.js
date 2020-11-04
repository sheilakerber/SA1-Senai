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
    var novoProduto = document.getElementById("produtoSelecionado").value
    var buttonAddProduto = document.getElementById("botaoAddNovoItem")
    if (buttonAddProduto.style.display === "none") {
        buttonAddProduto.style.display = "block"
    }
    //limpar array antes de inserir proximo produto
    produtosListaFinal = []
    botaoCarrinho
    

    if (novoProduto == "") {

        swal(
            {
                title: 'ATENÇÃO!',
                text: 'Por favor, selecione um produto!',
                icon: 'info',
                button: 'OK'
            })
         buttonAddProduto.style.display = "none"

    } else {
        if (produtosListaFinal.includes(novoProduto)) {

            swal(
                {
                    title: 'ATENÇÃO!',
                    text: 'Este produto já foi adicionado à lista!',
                    icon: 'error',
                    button: 'OK'
                })

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

    //ordenar os produtos por preco
    arrayObjetosLista.sort(dynamicSort("valorProduto"))

    if (arrayObjetosLista) {
        //filtro para pegar apenas os objetos da lista criada pelo usuario
        produtosSelecionados = arrayObjetosLista.filter(objeto => produtosListaFinal.includes(objeto.produto))

        //geração da tabela no html
        let table = document.querySelector("table");
        let data = Object.keys(produtosSelecionados[0]);

        generateTableHead(table, data);
        generateTable(table, produtosSelecionados);
    } else {
        
        swal(
            {
                title: 'ATENÇÃO!',
                text: 'Nenhum produto cadastrado!',
                icon: 'info',
                button: 'OK'
            })
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
        let textDataCompra = document.createTextNode(compra.dataCompraProduto.split('-').reverse().join('/'))
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
    //verificar se o produto já foi listado
    var novoProduto = document.getElementById("produtoSelecionado").value
    if (produtosListaFinal.includes(novoProduto)) {
        
        swal(
            {
                title: 'ATENÇÃO!',
                text: 'Este produto já foi adicionado à lista!',
                icon: 'error',
                button: 'OK'
            })

    } else {
        produtosListaFinal.push(novoProduto)
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

    //faz o botao AddCarrinho aparecer na tela quando a tabela preview é gerada
    var buttonCarrinho = document.getElementById("botaoCarrinho")
    if (buttonCarrinho.style.display === "none") {
        buttonCarrinho.style.display = "block"
            //document.getElementById('IDh3').style.display = "block"
    }

    var buttonReiniciarLista = document.getElementById("botaoReiniciarLista")
    if (buttonReiniciarLista.style.display === "none") {
        buttonReiniciarLista.style.display = "block"
    }

}

//<h3 id='IDh3' style="display: none">Prévia do seu carrinho:</h3>

function reiniciarLista() {
    //limpa o html para não sobrescrever resultados
    document.getElementById("idTabelaHtml").innerHTML = ""
    document.getElementById('tabelaPreview').innerHTML = ""
    document.getElementById('botaoAddNovoItem').style.display = "none"
    document.getElementById('botaoCarrinho').style.display = "none"
    document.getElementById('previewLista').style.display = "none"
    document.getElementById('botaoReiniciarLista').style.display = "none"


    //limpar array produtosListaFinal
    produtosListaFinal = []
}

function listaPreview() {

    document.getElementById('tabelaPreview').innerHTML = ""

    var listapreview = JSON.parse(localStorage.getItem("ListaFinal"))

    //ordenar os produtos por nome
    listapreview.sort(dynamicSort("Produto"))

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


//Polyfill
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function(searchElement, fromIndex) {
  
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }
  
        var o = Object(this);
  
        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;
  
        // 3. If len is 0, return false.
        if (len === 0) {
          return false;
        }
  
        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;
  
        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
  
        // 7. Repeat, while k < len
        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          // c. Increase k by 1.
          // NOTE: === provides the correct "SameValueZero" comparison needed here.
          if (o[k] === searchElement) {
            return true;
          }
          k++;
        }
  
        // 8. Return false
        return false;
      }
    });
  }