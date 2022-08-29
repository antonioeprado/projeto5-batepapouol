const drivenAPI = {
    entrada: "https://mock-api.driven.com.br/api/v6/uol/participants",
    conexao: "https://mock-api.driven.com.br/api/v6/uol/status",
    mensagens: "https://mock-api.driven.com.br/api/v6/uol/messages",
};

const usuario = {
    name: '',
    to: '',
    text: '',
    type: ''
};

const containerConversa = document.querySelector(".container-conversa");
const relogio = new Date().toTimeString();

let cadastrado = false;

function entrarNaSala() {

    usuario.name = prompt("Qual o seu lindo nome?");


    const req = {
        method: 'post',
        url: drivenAPI.entrada,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(usuario)
    }

    const prom = axios(req)
    .then((res) => {
        cadastrado = true;
    })
    .catch(error => {
        if(error.response.status === 400) {
            alert("Nome indisponível!\nDigite outro nome.");
            entrarNaSala();
        }
    })
}

function mensagem() {

}

entrarNaSala();
