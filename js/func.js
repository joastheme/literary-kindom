import supabase from "./db.js";

async function createTopic(topic, forum) {
    console.log("creating topic");
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


async function loadPage(page, pagesize, forum) {
    console.log("loading page");
    const from = page * pagesize;
    const to = (page + 1) * pagesize - 1;

    const { data, error } = await supabase
        .from("topics")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, to);

    console.log(data);

    if (error) {
        console.log(error);
        return;
    }

    for (const topic of data) {
        createTopic(topic, forum);
    }
}

export { loadPage, createTopic };