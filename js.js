const usuariocorreto = 'admin'
const senhacorreta = '123456'

function validar() {
    const usuario = document.getElementById('user').value
    const senha = document.getElementById('passwd').value

    if (usuario === usuariocorreto && senha === senhacorreta) {
alert('Login bem-sucedido!')
    } else {
        alert('Usuário ou senha incorretos. Tente novamente.')
        document.getElementById('passwd').textContent = ('');

    }
}