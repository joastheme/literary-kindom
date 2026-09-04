import supabase from "./js/db.js"

const form = document.querySelector('form');
const pSuccess = document.querySelector('#success');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        pSuccess.innerText = "Usuário ou senha inválidos!";
        console.log(error);
    } else {
        pSuccess.innerText = "Sucesso!";
    }
    console.log(data);
});