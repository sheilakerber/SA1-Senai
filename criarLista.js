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
    var novoProduto = document.getElementById("produtoSelecionado").value

    if (novoProduto == "") {
        alert("Por favor, selecione um produto!")
    } else {
        if (produtosListaFinal.includes(novoProduto)) {
            alert("Este produto já foi adicionado à lista!")
        } else {
            document.getElementById("listaFinal").innerHTML += " - " + novoProduto + '<br>'
            produtosListaFinal.push(novoProduto)
        }
    }
    //forma mais simples de resetar todos os campos
    document.forms[0].reset();
}

let produtosInseridosUsuario = [] //array para guardar somente os itens escolhidos pelo usuario
var produtosSelecionados //array que guarda os produtos filtrados pelo tipo de produto da lista

function finalizarLista() {
    //limpa o html para não sobrescrever resultados
    document.getElementById("listaFinal").innerHTML = ""

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

//////////   TABELA que COMPARA os PRECOS  ////////// Referencia: https://www.valentinog.com/blog/html-table/
function generateTableHead(table) {
    var nomeColunas = ["Produto", "Estabelecimento", "Valor (R$)"]
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of nomeColunas) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, arrayObjetosSelecionados) {
    for (let compra of arrayObjetosSelecionados) {
        let row = table.insertRow();
        for (key in compra) {
            //bairro e data da compra nao precisam aparecer no html
            if (key !== "bairroProduto" && key !== "dataCompraProduto") {
                let cell = row.insertCell();
                let text = document.createTextNode(compra[key]);
                cell.appendChild(text);
            }
        }
    }
}