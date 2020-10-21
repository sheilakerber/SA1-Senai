function gerarCarrinho() {
    window.location.href = 'carrinho.html'
}

function Carrinho() {
    // document.getElementById('tabelaCarrinho').innerHTML = ""

    var listaCarrinho = JSON.parse(localStorage.getItem("ListaFinal"))

    //ordenar os produtos por nome
    listaCarrinho.sort(dynamicSort("Produto"))

    console.log('listaCarrinho', listaCarrinho)

    table = document.getElementById('tabelaCarrinho')

    let dataCarrinho = ["Produto", "Marca", "Peso/Volume", "Estabelecimento", "Valor (R$)", "Quantidade", "Subtotal"]

    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of dataCarrinho) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }

    function generateTableCarrinho(table, arrayObjetosSelecionados) {
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

            //cria coluna Qtde
            var qtde = document.createElement('input')

            //var idCheck
            qtde.setAttribute('type', "number")
            qtde.setAttribute('name', "nomeQtde")
            qtde.setAttribute('id', `${arrayObjetosSelecionados.indexOf(compra)}`)
            // qtde.setAttribute('value', 1)

            //insere o input dentro da tabela
            let cellQtde = row.insertCell();
            let textQtde = document.createTextNode(qtde.value)
            cellQtde.appendChild(textQtde)
            
            //inserção e cálculo subtotal
            
            var subTotal = document.createElement('div')
            subTotal.setAttribute('id', `id+${arrayObjetosSelecionados.indexOf(compra)}`)
            subTotal.setAttribute('value', document.getElementById(`${arrayObjetosSelecionados.indexOf(compra)}`).value)
            console.log('subTotal', subTotal)

            let cellSubtotal = row.insertCell();        
            cellSubtotal.appendChild(subTotal)
            
            idRow = arrayObjetosSelecionados.indexOf(compra)  
            
            
        }
    }

    generateTableCarrinho(table, listaCarrinho)
    console.log('listaCarrinho', listaCarrinho)
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

// function salvadora() {
//     console.log("change OK")

//     console.log(document.getElementById("2"))
//     listaCarrinho = JSON.parse(localStorage.getItem("ListaFinal"))
//     var tabela = document.getElementById('tabelaCarrinho')
//     var subTotal
// console.log('salvadora', listaCarrinho)
//     for(let i of listaCarrinho) {
//         console.log('tabela.rows[i].cells[5]', tabela.rows[i].cells[5])
//         subTotal = tabela.rows[i].cells[5] * tabela.rows[i].cells[6]
//         document.getElementById(`id+${i}`).innerHTML = subTotal
//     }
// }

function calcular() {
    //pegar tabela
    var getTable = document.getElementById("tabelaCarrinho")

    //get quantidades 
    var quantidades = getTable.getElementsByTagName("nomeQtde")
    
    for (i = 0; i < quantidades.length; i++) {
        console.log('quantidades', quantidades[i].value)
        console.log("cells ", quantidades[i].innerText)
    }
}