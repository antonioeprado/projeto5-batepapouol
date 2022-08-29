const drivenAPI = {
    entrada: "https://mock-api.driven.com.br/api/v6/uol/participants",
    conexao: "https://mock-api.driven.com.br/api/v6/uol/status",
    mensagens: "https://mock-api.driven.com.br/api/v6/uol/messages",
    sync: null,
    loop: null,
    counter: 0,
};

const usuario = {
    name: null
};

const mensagem = {
    from: "",
    to: "todos",
    text: "",
    type: "message"
}

const conversa = [];
const data = [];
const containerConversa = document.querySelector(".container-conversa");
const botaoEnviar = document.querySelector("[name=paper-plane-outline]");
const textArea = document.querySelector("#msg-txt");
botaoEnviar.addEventListener("click", () => {
    enviarMensagem();
});
textArea.addEventListener("keydown", event => {
    if((event.code === "Enter" || event.code === "NumpadEnter") && !event.shiftKey) {
        enviarMensagem();
    }
})

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
        console.log(res.data);
        drivenAPI.sync = setInterval(() => {
            axios.post(drivenAPI.conexao, usuario)
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
        }, 5000);
        drivenAPI.loop = setInterval(() => {
            atualizarConversa();
            drivenAPI.counter++
        }, 3000)
    })
    .catch(error => {
        if(error.response.status === "400") {
            alert("Nome indisponível!\n\nFavor digitar outro nome.");
            entrarNaSala();
        } else if(error.request) {
            console.log(error.request);
        } else {
            console.log(error.message);
        }
    })

}

function enviarMensagem() {

    mensagem.text = textArea.value;
    mensagem.from = usuario.name;

    const req = {
        method: "post",
        url: drivenAPI.mensagens,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(mensagem)
    }

    const prom = axios(req)
    .then(textArea.value = "")
    .catch(error => {
        if(error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if(error.request) {
            console.log(error.request);
        } else {
            console.log(error.message)
        }
    })

}

function atualizarConversa() {

    if(drivenAPI.counter === 10) {
        conversa.length = 0;
    }
    const prom = axios.get(drivenAPI.mensagens)
    .then(res => {
        renderConversa(res.data);
    })
    .catch(error => {
        if(error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if(error.request) {
            console.log(error.request);
        } else {
            console.log(error.message)
        }
    })

}

function renderConversa(data) {

    let msg;
    data.forEach(obj => {
        if(conversa.includes(obj) === false) {
            conversa.push(obj);
            if(obj.type === "status") {
                msg = `<div class="msg" style="background-color: #DCDCDC">
                    <span class="muted">(${obj.time}): </span>
                    <b>${obj.from}</b> ${obj.text}
                </div>`
            } else {
                msg = `<div class="msg">
                    <span class="muted">(${obj.time}): </span>
                    <b>${obj.from}</b> para <b>${obj.to}</b>: ${obj.text}
                </div>`
            }

            containerConversa.insertAdjacentHTML("beforeend", msg);
            containerConversa.lastChild.scrollIntoView();
        }
    })
}

entrarNaSala();
