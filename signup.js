import supabase from "./js/db.js";

const form = document.querySelector('form');
const pSuccess = document.querySelector('#success');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        pSuccess.innerText = "Erro!";
        console.log(error);
    } else {
        pSuccess.innerHTML = "Sua conta foi criada com sucesso! <a href='/'>Voltar para página inicial</a>";
    }
    console.log(data);
});