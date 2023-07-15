const categoryURL = "https://tranlequocthong313.github.io/btl_thietkeweb_batdongsan/data/categories.json";
const realEstateURL = "https://tranlequocthong313.github.io/btl_thietkeweb_batdongsan/data/real_estates.json";
const newsURL = "https://tranlequocthong313.github.io/btl_thietkeweb_batdongsan/data/news.json";

let categories = [];
let realEstates = [];
let news = [];

const getCategories = () => {
    if (!categories.empty()) return categories;

    return new Promise((resolve, reject) =>
        fetch(categoryURL)
            .then(res => res.json())
            .then(data => {
                categories = data;
                resolve(categories);
            })
            .catch(reject)
    );
};

const getRealEstates = (type) => {
    if (!realEstates.empty()) return realEstates;

    return new Promise((resolve, reject) =>
        fetch(realEstateURL)
            .then(res => res.json())
            .then(data => {
                realEstates = data;
                if (type == null) return resolve(realEstates);
                resolve(realEstates.filter(realEstate => realEstate.type === +type));
            })
            .catch(reject)
    );
};

const getRealEstate = (id) => {
    if (!realEstates.empty()) return findRealEstate(id);
    return getRealEstates()
        .then(() => findRealEstate(id))
        .catch(null);
};

const findRealEstate = (id) => realEstates.find(realEstate => realEstate.id === +id);

const getAllNews = () => {
    if (!news.empty()) return news;

    return new Promise((resolve, reject) =>
        fetch(newsURL)
            .then(res => res.json())
            .then(data => {
                news = data;
                resolve(news);
            })
            .catch(reject)
    );
};

const getNewsByID = (id) => {
    if (!news.empty()) return findNews(id);
    return getAllNews()
        .then(() => findNews(id))
        .catch(null);
};

const findNews = (id) => news.find(it => it.id === +id);

export {
    getCategories,
    getRealEstate,
    getRealEstates,
    getNewsByID,
    getAllNews
};
