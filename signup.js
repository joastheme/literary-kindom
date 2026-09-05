import supabase from "./js/db.js";

const form = document.querySelector('form');
const pSuccess = document.querySelector('#success');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;
    const username = form.username.value;

    const {data: signup_data, error: auth_error} = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (auth_error) {
        pSuccess.innerText = "Erro!";
        console.log(auth_error);
        return;
    }

    const { data: profile_data, error: profile_error } = await supabase.from("profiles").insert({
        username: username,
        id: signup_data.user.id,
    }).select();

    if (profile_error) {
        console.log(profile_error);
        return;
    }

    pSuccess.innerHTML = "Sua conta foi criada com sucesso! <a href='/'>Voltar para página inicial</a>";

    console.log(profile_data);
});