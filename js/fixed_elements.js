import { handleError } from "./helper.js";
import { getCategories } from "./db.js";
import { API_URL } from './constant.js';

const initNavigation = () => {
    const navContainer = document.createElement('div');
    navContainer.classList.add("nav_container");
    navContainer.innerHTML = `
        <h1 class="heading_title animate__jackInTheBox">
            <a href="${API_URL}/html/">Bất động sản</a>
        </h1>
    `;

    getCategories()
        .then(categories => {
            const navList = document.createElement('ul');
            navList.classList.add('nav_list');
            for (let category of categories) {
                const li = document.createElement('li');
                li.classList.add('nav_item');
                li.classList.add('opacity_hover');
                li.onclick = () => location.href = category.href;
                li.innerHTML = category.name;
                navList.appendChild(li);
            }
            navContainer.appendChild(navList);

            const hamburgerMenu = document.createElement('button');
            hamburgerMenu.classList.add('hamburger_menu');
            hamburgerMenu.innerHTML = `
                    <img src="../img/hamburger_icon.png" alt="hamburger"> 
            `;
            hamburgerMenu.onclick = () => {
                if (window.getComputedStyle(navList).display === 'none') {
                    navList.classList.add('show');
                } else {
                    navList.classList.remove('show');
                }
            };

            navContainer.appendChild(hamburgerMenu);

            window.onresize = () => {
                navList.classList.remove('show');
            };
        })
        .catch(handleError)
        .finally(() => document.body.insertBefore(navContainer, document.body.firstChild));
};

const initFooter = () => {
    const footerTemplate = document.createElement('template');
    footerTemplate.innerHTML = `
        <div class="footer_container">
            <p>Bất động sản</p>
        </div>
    `;
    document.body.appendChild(footerTemplate.content);
};

const initToTopButton = () => {
    const toTopButton = document.createElement('button');
    toTopButton.onclick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    toTopButton.classList.add("to_top_button");
    toTopButton.classList.add("opacity_hover");
    toTopButton.innerHTML = `
                    <img src="../img/up_arrow_icon.png" alt="to top" />
    `;
    document.body.appendChild(toTopButton);

    window.onscroll = () => {
        if (window.pageYOffset > 200) {
            toTopButton.classList.add("show");
        } else {
            toTopButton.classList.remove("show");
        }
    };
};

initNavigation();
initToTopButton();
// initFooter();
