import { getQuery, handleError } from "./helper.js";
import { getNewsByID } from "./db.js";

const id = getQuery('id');

getNewsByID(id)
    .then(news => {
        console.log(news);
        const container = document.querySelector('.detail_news_container');
        container.innerHTML = `
            <h1>${news.title}</h1> 
            <div class="author_container">
                <img src="${news.author.avatar}" alt="${news.author.firstName}" /> 
                <div>
                    <p>${news.author.lastName} ${news.author.firstName}</p>
                    <p>${news.updateDate} . ${news.readTime} phút đọc</p>
                </div>
            </div>
            <p>${news.content}</p>
        `;
    })
    .catch(handleError);
