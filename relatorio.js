var todosRelatorios = JSON.parse(localStorage.getItem("TODOS relatórios"))
var dadosLista = todosRelatorios[0].pop()
table = document.getElementById('tabelaRelatorio')

function gerarRelatorio() {
    document.getElementById('fieldset').setAttribute('style', 'display: block')
    document.getElementById("legenda").innerHTML = `CPF: ${dadosLista.cpfUsuario} - Data: ${dadosLista.dataLista} - Total: ${dadosLista.TotalLista}`
    generateTableCarrinho(table, todosRelatorios[0])
}

function generateTableCarrinho(table, arrayObjetosSelecionados) {
    
    let dataCarrinho = ["Produto", "Marca", "Peso/Volume", "Estabelecimento", "Valor (R$)", "Quantidade", "Subtotal (R$)"]

    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of dataCarrinho) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }

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

        let cellQtde = row.insertCell();
        let textQtde = document.createTextNode(compra.Quantidade)
        cellQtde.appendChild(textQtde)

        let cellSubtotal = row.insertCell();
        let textSubtotal = document.createTextNode(compra.SubTotal)
        cellSubtotal.appendChild(textSubtotal)
    }
}