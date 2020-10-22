function generateHeadUsuarios(table) {
    var nomeColunas = ['Nome', 'Nascimento', 'CPF', 'E-mail', 'Bairro', 'Editar/Excluir']
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of nomeColunas) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTableUsuarios(table, arrayObjetosSelecionados) {
    for (let compra of arrayObjetosSelecionados) {
        let row = table.insertRow();

        let cellNome = row.insertCell();
        let textNome = document.createTextNode(compra.nome)
        cellNome.appendChild(textNome)

        let cellNascimento = row.insertCell();
        let textNascimento = document.createTextNode(compra.nascimento)
        cellNascimento.appendChild(textNascimento)

        let cellCPF = row.insertCell();
        let textCPF = document.createTextNode(compra.cpf)
        cellCPF.appendChild(textCPF)

        let cellEmail = row.insertCell();
        let textEmail = document.createTextNode(compra.email)
        cellEmail.appendChild(textEmail)

        let cellBairro = row.insertCell();
        let textBairro = document.createTextNode(compra.bairro)
        cellBairro.appendChild(textBairro)

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

        // idRow = arrayObjetosSelecionados.indexOf(compra)
    }
}

function gerarListaUsuarios() {

        //cria botao deletar
        let section = document.getElementById('botoesEditarExcluir')
        section.innerHTML = ''
        var btn = document.createElement("button")
        btn.innerText = 'Deletar'
        btn.addEventListener('click', usuariosDeletar)
        section.appendChild(btn)

    //limpa o html para não sobrescrever resultados
    document.getElementById("listaCadastrados").innerHTML = ""

    //pega todos os usuarios salvos no local storage
    let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))

    //ordenar os usuarios pelo ID
    listaUsuarios.sort(dynamicSort("cpf"))

    if (listaUsuarios) {
    //     //filtro para pegar apenas os objetos da lista criada pelo usuario
    //     produtosSelecionados = listaUsuarios.filter(objeto => produtosListaFinal.includes(objeto.produto))

        //geração da tabela no html
        let table = document.querySelector("table");
        let data = Object.keys(listaUsuarios[0]);

        generateHeadUsuarios(table, data);
        generateTableUsuarios(table, listaUsuarios);
    } else {
        alert("Nenhum usuario cadastrado")
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

// ----------------------LISTA ESTABELECIMENTOS------------------------------

function generateHeadEstabelecimentos(table) {
    var nomeColunas = ['Estabelecimento', 'CEP', 'Contato', 'Bairro', 'Editar/Excluir']
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of nomeColunas) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTableEstabelecimentos(table, arrayObjetosSelecionados) {
    for (let compra of arrayObjetosSelecionados) {
        let row = table.insertRow();

        let cellEstab = row.insertCell();
        let textEstab = document.createTextNode(compra.estabelecimento)
        cellEstab.appendChild(textEstab)

        let cellCEP = row.insertCell();
        let textCEP = document.createTextNode(compra.cep)
        cellCEP.appendChild(textCEP)

        let cellContato = row.insertCell();
        let textContato = document.createTextNode(compra.contato)
        cellContato.appendChild(textContato)

        let cellBairro = row.insertCell();
        let textBairro = document.createTextNode(compra.bairroMercado)
        cellBairro.appendChild(textBairro)

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

        // idRow = arrayObjetosSelecionados.indexOf(compra)
    }
}

function gerarListaEstabelecimentos() {

        //cria botao deletar
        let section = document.getElementById('botoesEditarExcluir')
        section.innerHTML = ''
        var btn = document.createElement("button")
        btn.innerText = 'Deletar'
        btn.addEventListener('click', estabelecimentosDeletar)
        section.appendChild(btn)

    //limpa o html para não sobrescrever resultados
    document.getElementById("listaCadastrados").innerHTML = ""

    //limpa o html para não sobrescrever resultados
    document.getElementById("listaCadastrados").innerHTML = ""

    //pega todos os usuarios salvos no local storage
    let lista = JSON.parse(localStorage.getItem("estabelecimentos"))

    //ordenar os usuarios pelo ID
    lista.sort(dynamicSort("estabelecimento"))

    if (lista) {
    //     //filtro para pegar apenas os objetos da lista criada pelo usuario
    //     produtosSelecionados = lista.filter(objeto => produtosListaFinal.includes(objeto.produto))

        //geração da tabela no html
        let table = document.querySelector("table");
        let data = Object.keys(lista[0]);

        generateHeadEstabelecimentos(table, data);
        generateTableEstabelecimentos(table, lista);
    } else {
        alert("Nenhum usuario cadastrado")
    }

}

// ----------------------LISTA PRODUTOS------------------------------
var excluirProduto = document.getElementById("excluirProduto")

function gerarListaProdutos() {
    
    //cria botao deletar
    let section = document.getElementById('botoesEditarExcluir')
    section.innerHTML = ''
    var btn = document.createElement("button")
    btn.innerText = 'Deletar'
    btn.addEventListener('click', produtosDeletar)
    section.appendChild(btn)
    //limpa o html para não sobrescrever resultados
    document.getElementById("listaCadastrados").innerHTML = ""

    //pega todos os produtos salvos no local storage
    var arrayObjetosLista = JSON.parse(localStorage.getItem("cadastros"))

    //ordenar os produtos por preco
    arrayObjetosLista.sort(dynamicSort("produto"))

    if (arrayObjetosLista) {
        //filtro para pegar apenas os objetos da lista criada pelo usuario
        // produtosSelecionados = arrayObjetosLista.filter(objeto => produtosListaFinal.includes(objeto.produto))

        //geração da tabela no html
        let table = document.querySelector("table");
        let data = Object.keys(arrayObjetosLista[0]);

        generateTableHead(table, data);
        generateTable(table, arrayObjetosLista);
    } else {
        alert("Nenhum produto cadastrado")
    }

}

//   TABELA que COMPARA os PRECOS  Referencia: https://www.valentinog.com/blog/html-table/
function generateTableHead(table) {
    var nomeColunas = ["Data Compra", "Produto", "Marca", "Peso/Volume", "Estabelecimento", "Valor (R$)", "Editar/Excluir"]
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of nomeColunas) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

// var idRow
// var novoArrayListaCompras = []

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

        // idRow = arrayObjetosSelecionados.indexOf(compra)
    }
}


//--------------------FUNÇÕES DE DELEÇÃO---------------------------------------

function produtosDeletar() {

    var arrayObjetosLista = JSON.parse(localStorage.getItem("cadastros"))

    //pegar tabela
    var getTable = document.getElementById("listaCadastrados")

    //get checked 
    var checkBoxes = getTable.getElementsByTagName("input")

    for (i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            console.log('indice checkBox', checkBoxes[i])
            console.log('Cadastros', arrayObjetosLista[i])
            arrayObjetosLista.splice(i,1)
        }
    }
    localStorage.setItem('cadastros', JSON.stringify(arrayObjetosLista))
    alert('Produto excluído com sucesso!')
    gerarListaProdutos()
}

function usuariosDeletar() {

    let listaUsuarios = JSON.parse(localStorage.getItem("usuários"))

    //pegar tabela
    var getTable = document.getElementById("listaCadastrados")

    //get checked 
    var checkBoxes = getTable.getElementsByTagName("input")

    for (i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            console.log('indice checkBox', checkBoxes[i])
            console.log('Cadastros', listaUsuarios[i])
            listaUsuarios.splice(i,1)
        }
    }
    localStorage.setItem('usuários', JSON.stringify(listaUsuarios))
    alert('Usuário excluído com sucesso!')
    gerarListaUsuarios()
}

function estabelecimentosDeletar() {

    let lista = JSON.parse(localStorage.getItem("estabelecimentos"))

    //pegar tabela
    var getTable = document.getElementById("listaCadastrados")

    //get checked 
    var checkBoxes = getTable.getElementsByTagName("input")

    for (i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            console.log('indice checkBox', checkBoxes[i])
            console.log('Cadastros', lista[i])
            lista.splice(i,1)
        }
    }
    localStorage.setItem('estabelecimentos', JSON.stringify(lista))
    alert('Estabelecimento excluído com sucesso!')
    gerarListaEstabelecimentos()
}