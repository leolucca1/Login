let tipoSelecionado = null;


const usuarios = {

    estudante: {
        usuario: "aluno",
        senha: "123456",
        pagina: "estudante.html"
    },

    professor: {
        usuario: "professor",
        senha: "123456",
        pagina: "professor.html"
    }

};


const roleScreen =
    document.getElementById("roleScreen");

const loginScreen =
    document.getElementById("loginScreen");

const tituloLogin =
    document.getElementById("tituloLogin");

const profileBadge =
    document.getElementById("profileBadge");

const usuarioInput =
    document.getElementById("user");

const senhaInput =
    document.getElementById("passwd");

const mensagem =
    document.getElementById("mensagem");

const loginForm =
    document.getElementById("loginForm");


function trocarTela(saindo, entrando) {

    saindo.classList.add("exit-left");

    setTimeout(() => {

        saindo.classList.remove("active");
        saindo.classList.remove("exit-left");

        entrando.classList.add("active");

    }, 230);

}


function selecionarTipo(tipo) {

    tipoSelecionado =
        tipo;

    limparFormulario();


    if (tipo === "professor") {

        tituloLogin.textContent =
            "Login do professor";

        profileBadge.textContent =
            "Professor";

    } else {

        tituloLogin.textContent =
            "Login do estudante";

        profileBadge.textContent =
            "Estudante";

    }


    trocarTela(
        roleScreen,
        loginScreen
    );


    setTimeout(() => {

        usuarioInput.focus();

    }, 550);

}


function voltar() {

    tipoSelecionado =
        null;

    limparFormulario();

    trocarTela(
        loginScreen,
        roleScreen
    );

}


function limparFormulario() {

    usuarioInput.value = "";

    senhaInput.value = "";

    mensagem.textContent = "";

    mensagem.className =
        "message";

}


function mostrarMensagem(
    texto,
    tipo
) {

    mensagem.textContent =
        texto;

    mensagem.className =
        `message ${tipo}`;

}


function mostrarSenha() {

    senhaInput.type =
        senhaInput.type === "password"
            ? "text"
            : "password";

}


loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        validar();

    }
);


function validar() {

    const usuario =
        usuarioInput.value.trim();

    const senha =
        senhaInput.value;


    mensagem.className =
        "message";


    if (!usuario) {

        mostrarMensagem(
            "Digite seu usuário.",
            "error"
        );

        usuarioInput.focus();

        return;

    }


    if (!senha) {

        mostrarMensagem(
            "Digite sua senha.",
            "error"
        );

        senhaInput.focus();

        return;

    }


    const dados =
        usuarios[tipoSelecionado];


    if (
        usuario === dados.usuario &&
        senha === dados.senha
    ) {

        mostrarMensagem(
            "Login realizado com sucesso.",
            "success"
        );


        setTimeout(() => {

            window.location.href =
                dados.pagina;

        }, 900);

    }

    else {

        mostrarMensagem(
            "Usuário ou senha incorretos.",
            "error"
        );

        senhaInput.value =
            "";

        senhaInput.focus();

    }

}



/* LOGO VIA WIKIPÉDIA */

async function carregarLogoSenac() {

    const logo =
        document.getElementById(
            "senacLogo"
        );


    try {

        const url =
            "https://pt.wikipedia.org/w/api.php" +
            "?action=query" +
            "&titles=Serviço_Nacional_de_Aprendizagem_Comercial" +
            "&prop=pageimages" +
            "&pithumbsize=600" +
            "&format=json" +
            "&origin=*";


        const resposta =
            await fetch(url);


        const dados =
            await resposta.json();


        const paginas =
            dados.query.pages;


        const pagina =
            Object.values(paginas)[0];


        if (pagina.thumbnail) {

            logo.src =
                pagina.thumbnail.source;


            logo.onload =
                function() {

                    logo.classList.add(
                        "loaded"
                    );

                };

        }

    }

    catch (erro) {

        console.error(
            "Erro ao carregar logo:",
            erro
        );

    }

}


carregarLogoSenac();