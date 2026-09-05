let forum = document.querySelector("#forum");

// Ajuste de estilo
let nav = document.querySelector("nav");
forum.style.height = `${window.innerHeight - nav.offsetHeight}px`;



import supabase from "./js/db.js";

const { data } = await supabase.from("topics").select("*");

console.log(data);

for (const topic of data) {
    const {title, content, author_id, id} = topic;

    const div = document.createElement("div");
    forum.appendChild(div);
    div.classList.add("topico");

    const topic_title = document.createElement("h1");
    topic_title.textContent = title;
    div.appendChild(topic_title);

    const topic_text = document.createElement("p");
    topic_text.textContent = content;
    div.appendChild(topic_text);

    const topic_author = document.createElement("p");
    const {data: author} = await supabase.from("profiles").select("*").eq("id", author_id).single();
    topic_author.textContent = "Written by: " + author.username;
    topic_author.classList.add("text-right");
    div.appendChild(topic_author);
    /* Dentre outras */

    console.log(id);
    div.addEventListener("click", () => {
        let url = `./topic?id=${id}`;
        window.location.href = url;
        console.log(url);
    });
}

const topic_submit = document.querySelector("#topic-submit");

topic_submit.addEventListener("click", async() => {
    const textarea = document.querySelector("#start-topic");
    const topictitle = document.querySelector("#start-topic-title");

    const text = textarea.value;
    const title = topictitle.value;

    const { data: { user }, error: auth_error } = await supabase.auth.getUser();

    if (auth_error) {
        console.log(auth_error);
        return;
    }
    if (!user) {
        console.log("no user");
        return;
    }

    const { data, error } = await supabase.from("topics").insert({
        title: title,
        content: text,
        author_id: user.id,
    }).select();

    if (error) console.log(error);
    console.log(data);
});