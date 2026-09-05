import supabase from "./js/db.js";


// Conseguir o parametro na URL
const params = new URLSearchParams(window.location.search);
const topic_id = params.get("id");

// Decobre usuário
const { data: { user }, error: auth_error } = await supabase.auth.getUser();

if (auth_error) {console.log(auth_error)}
const type = document.getElementById("type");
if (!user) {
    type.classList.add("display-none");
}

// Pesquisa o tópico principal
const { data } = await supabase.from("topics").select("*").eq("id", topic_id).single();
console.log(data);
const {title, content, author_id} = data;

// Coloca o tópico principal
let forum = document.querySelector("#forum");

const topic_div = document.createElement("div");
forum.appendChild(topic_div);
topic_div.classList.add("topico");

const topic_title = document.createElement("h1");
topic_title.textContent = title;
topic_div.appendChild(topic_title);

const topic_text = document.createElement("p");
topic_text.textContent = content;
topic_div.appendChild(topic_text);

const topic_author = document.createElement("p");
const {data: author} = await supabase.from("profiles").select("*").eq("id", author_id).single();
topic_author.textContent = "Written by: " + author.username;
topic_author.classList.add("text-right");
topic_div.appendChild(topic_author);


/* ==========  Colocar as respostas  ========== */
const {data: replies} = await supabase.from("replies").select("*").eq("topic_id", topic_id);

for (const reply of replies) {
    const divisao = document.createElement("div");
    forum.appendChild(divisao);
    divisao.classList.add("line");

    const replyImg = document.createElement("img");
    replyImg.src = "./assets/images/reply.png"; // Por enquanto tá imagem de teste
    divisao.appendChild(replyImg);
    replyImg.classList.add("replyImg");

    const div = document.createElement("div");
    div.classList.add("reply");
    divisao.appendChild(div);

    const text = document.createElement("p");
    text.textContent = reply.content;
    div.appendChild(text);

    const author = document.createElement("p");
    const { data } = await supabase.from("profiles").select("*").eq("id", reply.author_id).single();
    author.textContent = data.username;
    author.classList.add("text-right");
    div.appendChild(author);
}

// Novas Respostas

const submit_reply = document.getElementById("submit-reply");

submit_reply.addEventListener("click", async () => {
    if (!user) return;

    const textarea = document.getElementById("new-reply");
    const text = textarea.value;

    const { data, error } = await supabase
        .from("replies")
        .insert({
            topic_id: topic_id,
            author_id: user.id,
            content: text,
        })
        .select();
})