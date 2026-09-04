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
        let url = `./topic.html?id=${id}`;
        window.location.href = url;
        console.log(url);
    });
}

