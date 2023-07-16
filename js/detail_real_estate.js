import { getRealEstate } from "./db.js";
import { formatPrice, getFullAddress, handleError, alertHaventHandledFeature, getQuery } from "./helper.js";
import Slider from "./slider.js";

const id = getQuery('id');

const changeBigImage = (img) => {
    const bigImage = document.querySelector('.detail_real_estate_big_img');
    bigImage.src = img.src;
};

getRealEstate(id)
    .then(realEstate => {
        detailPage(realEstate);
    })
    .catch(handleError);

function detailPage(realEstate) {
    const container = document.querySelector(".detail_real_estate_container");
    container.innerHTML = `
            <div class="detail_real_estate_content">
                <img class="detail_real_estate_big_img" src="${realEstate.images[0]}" alt="${realEstate.title}"/>
                <div class="detail_real_estate_slide"></div>
                <h2>${realEstate.title}</h2>
                <p>${getFullAddress(realEstate.address)}</p>
                <div class="detail_real_estate_common_spec">
                    <div>
                        <p>Mức giá</p>
                        <h3>${formatPrice(realEstate.price)}</h3>
                    </div>
                    <div>
                        <p>Diện tích</p>
                        <h3>${realEstate.area} m2</h3>
                    </div>
                </div>
                <h4 class="feature_title">Thông tin mô tả</h4>
                <p class="detail_real_estate_description">${realEstate.description}</p>
                <h4 class="feature_title">Đặc điểm bất động sản</h4>
                <div class="detail_real_estate_specs"></div>
                <div class="detail_real_estate_common_spec">
                    <div>
                        <p>Ngày đăng</p>
                        <h4>${realEstate.publishDate}</h4>
                    </div>
                    <div>
                        <p>Ngày hết hạn</p>
                        <h4>${realEstate.expirationDate}</h4>
                    </div>
                    <div>
                        <p>Mã tin</p>
                        <h4>${realEstate.id}</h4>
                    </div>
                </div>
            </div>
            <div class="detail_real_estate_author_container">
                <img src="${realEstate.author.avatar}" alt="${realEstate.author.lastName} ${realEstate.author.lastName}">
                <h4>${realEstate.author.firstName} ${realEstate.author.lastName}</h4>
                <button class="opacity_hover">Nhắn tin</button>
                <button class="opacity_hover">Yêu cầu liên hệ lại</button>
            </div>
        `;

    const specs = container.querySelector('.detail_real_estate_specs');
    Object.entries(realEstate.specs).forEach(([key, value]) => {
        const div = document.createElement('div');
        div.classList.add("detail_real_estate_specs_item");
        div.innerHTML = `
                <strong>${key}: </strong>
                <span>${value}</span>
            `;
        specs.appendChild(div);
    });

    const slider = document.querySelector('.detail_real_estate_slide');
    slider.appendChild(Slider(realEstate.images, changeBigImage));
}

