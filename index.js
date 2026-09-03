import supabase from "./js/db.js";

const { data } = await supabase.from("topics").select("*");

console.log(data);

let forum = document.querySelector("#forum");

for (const topic of data) {
    const {title, content, author_id, id} = topic;
    console.log(id);

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

    div.addEventListener("click", (e) => {
        window.location.href = `./topic.html?id=${id}`;
    });
}

