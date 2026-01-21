const inputTarefa = document.getElementById('novaTarefa');
const btnAdicionar = document.getElementById('adicionarBtn');
const tabelaTarefas = document.querySelector('#tabelaTarefas tbody');

// Criar tarefa na tabela
function criarTarefa(texto, concluida = false) {
    const tr = document.createElement('tr');

    const tdTexto = document.createElement('td');
    tdTexto.textContent = texto;
    if(concluida) tdTexto.classList.add('completed');

    const tdStatus = document.createElement('td');
    tdStatus.textContent = concluida ? 'Concluída' : 'Pendente';

    const tdAcao = document.createElement('td');
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.classList.add('btn-remover');
    btnRemover.addEventListener('click', () => {
        tr.remove();
        salvarTarefas();
    });

    tdAcao.appendChild(btnRemover);
    tr.appendChild(tdTexto);
    tr.appendChild(tdStatus);
    tr.appendChild(tdAcao);

    // Toggle concluída ao clicar no texto
    tdTexto.addEventListener('click', () => {
        tdTexto.classList.toggle('completed');
        tdStatus.textContent = tdTexto.classList.contains('completed') ? 'Concluída' : 'Pendente';
        salvarTarefas();
    });

    tabelaTarefas.appendChild(tr);
}

// Adicionar tarefa
btnAdicionar.addEventListener('click', () => {
    const tarefa = inputTarefa.value.trim();
    if(tarefa !== '') {
        criarTarefa(tarefa);
        inputTarefa.value = '';
        salvarTarefas();
    }
});

// Salvar no LocalStorage
function salvarTarefas() {
    const tarefas = [];
    tabelaTarefas.querySelectorAll('tr').forEach(tr => {
        tarefas.push({
            texto: tr.children[0].textContent,
            concluida: tr.children[0].classList.contains('completed')
        });
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Carregar tarefas ao iniciar
function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(t => criarTarefa(t.texto, t.concluida));
}

carregarTarefas();