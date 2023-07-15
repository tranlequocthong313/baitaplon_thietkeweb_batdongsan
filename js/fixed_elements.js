import { handleError } from "./helper.js";
import { getCategories } from "./db.js";

const initNavigation = () => {
    const navContainer = document.createElement('div');
    const navTemplate = document.createElement('template');
    navContainer.classList.add("nav_container");
    navTemplate.innerHTML = `
        <h1 class="heading_title">
            <a href="/html">Bất động sản</a>
        </h1>
    `;

    getCategories()
        .then(categories => {
            let categoryHTML = "";
            for (let category of categories) {
                categoryHTML += `
                        <div class="nav_item">
                            <a href="${category.href}">${category.name}</a> 
                        </div>
                `;
            }
            navTemplate.innerHTML += categoryHTML;
            navContainer.innerHTML = navTemplate.innerHTML;
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
    toTopButton.onclick = () => window.location.href = "#";
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
