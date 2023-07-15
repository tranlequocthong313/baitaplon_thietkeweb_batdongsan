import { getAllNews } from "./db.js";
import {autoChangeItem, detailNews, handleError} from "./helper.js";

getAllNews()
    .then(news => {
        if (news.empty()) {
            // TODO: show no items message
            return;
        }
        newsPage(news);
    })
    .catch(handleError);

const newsPage = (news) => {
    const newsList = document.querySelector(".news_list");
    for (let it of news) {
        const li = document.createElement("li");
        li.classList.add("news_item");
        li.classList.add("opacity_hover");
        li.innerHTML = `
                        <img src="${it.thumbnail}" alt=${it.title}/>
                        <div class="news_item_content">
                            <span>${it.publishDate} . ${it.author.lastName} ${it.author.firstName}</span>
                            <h4>${it.title}</h4>
                            <p class="line_clamp_3">${it.content}</p>
                        </div>
                `;
        li.onclick = () => detailNews(it.id);
        newsList.appendChild(li);
    }
};
