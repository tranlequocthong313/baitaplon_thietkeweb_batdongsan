import { getRealEstates } from "./db.js";
import {detailRealEstate, formatPrice, getFullAddress, getQuery, handleError} from "./helper.js";

const type = getQuery('type');

getRealEstates(type)
    .then(realEstates => {
        if (realEstates.empty()) {
            // TODO: Show no item message
            return;
        }

        const realEstateList = document.getElementById("real_estate_list");
        for (let realEstate of realEstates) {
            const li = document.createElement("li");
            li.classList.add("real_estate_item");
            li.classList.add("opacity_hover");
            li.onclick = () => detailRealEstate(realEstate.id);
            li.innerHTML = `
                    <div class="thumbnails">
                        <img src="${realEstate.images[0]}" alt="${realEstate.title}" />
                        <div>
                            <img src="${realEstate.images[1]}" alt="${realEstate.title}" />
                            <div>
                                <img src="${realEstate.images[2]}" alt="${realEstate.title}" />
                                <img src="${realEstate.images[3]}" alt="${realEstate.title}" />
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <h3>${realEstate.title}</h3>
                        <p>${getFullAddress(realEstate.address)}</p>
                        <div class="real_estate_item_spec">
                            <p>${formatPrice(realEstate.price)}</p>
                            <p>${realEstate.area} m2</p>
                        </div>
                        <p class="real_estate_item_description line_clamp_2">${realEstate.description}</p>
                    </div>
            `;
            realEstateList.appendChild(li);
        }

    })
    .catch(handleError);

