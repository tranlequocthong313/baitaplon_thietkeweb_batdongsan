import {
    handleError,
    randomSearchingPlaceholder,
    autoChangeItem,
    detailRealEstate,
    alertHaventHandledFeature,
    detailNews,
    formatPrice
} from "./helper.js";
import { getAllNews, getRealEstates } from "./db.js";

const input = document.querySelector(".search_input");
randomSearchingPlaceholder(input);

let timer = null;
let currentNewsIndex = 0;
const newsMain = document.querySelector(".home_news_main");
const newsList = document.querySelector(".home_news_list");

getAllNews()
    .then(news => {
        if (news.empty()) {
            // TODO: show no items message
            return;
        }
        homeNews(news);
    })
    .catch(handleError);

const homeNews = (news) => {
    for (let i = 0; i < 6; i++) {
        const li = document.createElement("li");
        li.classList.add("home_news_item");
        li.classList.add("opacity_hover");
        li.onmouseenter = () => {
            changeMainNews(news[i]);
            clearInterval(timer);
        };
        li.onmouseleave = () => timer = autoChangeItem(news, currentNewsIndex, changeMainNews);
        li.innerHTML = `
                        ${news[i].title} 
                `;
        li.onclick = () => detailNews(news[i].id);
        newsList.appendChild(li);
    }

    changeMainNews(news[0]);
    timer = autoChangeItem(news, currentNewsIndex, changeMainNews);
};

const changeMainNews = (it) => {
    newsMain.onclick = () => detailNews(it.id);
    newsMain.innerHTML = `
            <img class="home_news_main_thumbnail opacity_hover" src="${it.thumbnail}" alt="${it.title}" /> 
            <h2 class="opacity_hover">${it.title}</h2>
            <p class="opacity_hover">${it.publishDate}</p>
        `;
};

getRealEstates()
    .then(realEstates => {
        const realEstateContainer = document.querySelector(".real_estate_container");
        for (let realEstate of realEstates) {
            const div = document.createElement('div');
            const realEstateItem = document.createElement('div');
            realEstateItem.classList.add('real_estate_item');
            realEstateItem.classList.add('opacity_hover');
            realEstateItem.onclick = () => detailRealEstate(realEstate.id);
            realEstateItem.innerHTML = `
                <img src="${realEstate.images[0]}" alt="${realEstate.title}" />
                <div class="real_estate_item_content">
                    <h5 class="line_clamp_2">${realEstate.title}</h5>            
                    <p>${formatPrice(realEstate.price)} . ${realEstate.area} m2</p>
                    <p>${realEstate.address.district}, ${realEstate.address.city}</p>            
                </div>
            `;
            div.appendChild(realEstateItem);
            realEstateContainer.appendChild(div);
        }
    })
    .catch(handleError);
