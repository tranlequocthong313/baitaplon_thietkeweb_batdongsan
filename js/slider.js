const Slider = (images, cb) => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="slider_container">
            <div class="slider">
            </div>
            <div class="prev_button opacity_hover">&lt;</div>
            <div class="next_button opacity_hover">&gt;</div>
        </div>
    `;

    const slider = container.querySelector('.slider');
    for (let image of images) {
        const img = document.createElement('img');
        img.onclick = () => {
            cb(img);
        };
        img.classList.add('opacity_hover');
        img.src = image;
        slider.appendChild(img);
    }

    return container;
};


export default Slider;
