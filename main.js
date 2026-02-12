let itemSelecionado = null; 

function adicionarItem(lista) {
    const input = document.getElementById(`input${lista}`);
    const valor = input.value.trim();  // Remove espaços extras

    if (valor) {
        const listaElement = document.getElementById(`lista${lista}`);
        
        
        const novoElemento = document.createElement('li');
        const novoParagrafo = document.createElement('p');
        novoParagrafo.textContent = valor;  
        novoElemento.appendChild(novoParagrafo); 

    
        listaElement.appendChild(novoElemento);
        
        
        input.value = '';
    } else {
        alert("Por favor, digite um valor!");
    }

    salvarListas();

}


function selecionarLista(lista) {
    let listaSelecionada;
    
    if (lista === 'A') {
        listaSelecionada = document.getElementById('listaA');
    } else if (lista === 'B') {
        listaSelecionada = document.getElementById('listaB');
    }

    
    const itens = listaSelecionada.getElementsByTagName('li');
    for (let item of itens) {
        item.style.backgroundColor = '';  
        item.onclick = function() {
            itemSelecionado = item;  
            item.style.backgroundColor = 'lightblue';  
        };
    }
}


function mudarLista() {
    if (!itemSelecionado) {
        alert("Selecione um item para mover.");
        return;
    }

    const listaA = document.getElementById('listaA');
    const listaB = document.getElementById('listaB');

    if (itemSelecionado.parentElement === listaA) {
       
        listaA.removeChild(itemSelecionado);
        listaB.appendChild(itemSelecionado);
    } else if (itemSelecionado.parentElement === listaB) {
        
        listaB.removeChild(itemSelecionado);
        listaA.appendChild(itemSelecionado);
    }

    itemSelecionado.style.backgroundColor = '';  
    itemSelecionado = null; 

    salvarListas();
}

function salvarListas() {
    const listaA = [];
    const listaB = [];

    document.querySelectorAll("#listaA li").forEach(li => {
        listaA.push(li.textContent);
    });

    document.querySelectorAll("#listaB li").forEach(li => {
        listaB.push(li.textContent);
    });

    localStorage.setItem("listaA", JSON.stringify(listaA));
    localStorage.setItem("listaB", JSON.stringify(listaB));
}

window.onload = function() {
    const listaA = JSON.parse(localStorage.getItem("listaA")) || [];
    const listaB = JSON.parse(localStorage.getItem("listaB")) || [];

    listaA.forEach(item => {
        adicionarItemCarregado("A", item);
    });

    listaB.forEach(item => {
        adicionarItemCarregado("B", item);
    });
};

function adicionarItemCarregado(lista, valor) {
    const listaElement = document.getElementById(`lista${lista}`);
    const novoElemento = document.createElement('li');
    novoElemento.textContent = valor;
    listaElement.appendChild(novoElemento);
}

function removerLista(){

    if (!itemSelecionado) {
        alert("Selecione um item para remover.");
        return;
    }

    // Remove o item da lista
    itemSelecionado.parentElement.removeChild(itemSelecionado);

    // Limpa a variável
    itemSelecionado = null;

    // Atualiza o localStorage
    salvarListas();
}
