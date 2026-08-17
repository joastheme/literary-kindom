/* Selecionar a seleção dos fóruns, buscar no banco de dados os fóruns por popularidade, escolhe os x primeiros e cria um div pra cada */

let forum = document.querySelector("#forum");

let topics;

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

topics.forEach(topic => {
    div = document.createElement("div");
    forum.appendChild(div);

    topic_title = document.createElement("h1");
    topic_title.textContent = topic["main_post"]["title"];
    div.appendChild(topic_title);
    /* Dentre outras */
});

