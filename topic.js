import supabase from "./js/db.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const { data } = await supabase.from("topics").select("*").eq("id", id).single();

console.log(data);

const {title, content, author_id} = data;

let forum = document.querySelector("#forum");

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

console.log(author);