import supabase from "./js/db.js";

const form = document.querySelector('form');
const pSuccess = document.querySelector('#success');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;
    const username = form.username.value;

    const { data: signup_data, error: auth_error } =
        await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username
                }
            }
        });

    if (auth_error) {
        pSuccess.innerText = "Erro!";
        console.log(auth_error);
        return;
    }
});