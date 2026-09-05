import { loadPage } from "./js/func.js"
import supabase from "./js/db.js";

let forum = document.querySelector("#forum");
let loadmore = document.querySelector("#load-more");

const pagesize = 10;

loadPage(0, pagesize, forum);
let pages = 1;

loadmore.addEventListener("click", () => {
    loadPage(pages, pagesize, forum);
    pages++;
})

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