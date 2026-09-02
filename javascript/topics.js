import supabase from "./db.js";

/* Selecionar a seleção dos fóruns, buscar no banco de dados os fóruns por popularidade, escolhe os x primeiros e cria um div pra cada */

const {data} = await supabase.from("topics").select("*");

console.log(data);

/* Inicializar topics com uma lista de objetos com atributos de cada tópico, atributos esses que estão no db. Algo como:
{
    id: int;
    main_post: int;   (em id)
};
main_post é o post que iniciou o tópico
Os posts são do tipo:
{
    id: int;
    topic_id: int;
    title: string;
    text: string;
}
sendo topic_id o tópico que o post faz parte
*/

let forum = document.querySelector("#forum");

data.forEach(topic => {
    console.log(topic);
    const div = document.createElement("div");
    forum.appendChild(div);
    const topic_title = document.createElement("h1");
    topic_title.textContent = topic.main_post_title;
    div.appendChild(topic_title);
    const topic_text = document.createElement("p");
    topic_text.textContent = topic.main_post_text;
    div.appendChild(topic_text);
    div.classList.add("topico")
    /* Dentre outras */
});

