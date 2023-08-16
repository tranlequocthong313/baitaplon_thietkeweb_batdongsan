Array.prototype.empty = function () {
    return this.length === 0;
};

String.prototype.empty = function () {
    return this.length === 0;
};

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
};

const handleError = (e) => {
    // TODO: Pop up an error message model
    console.error(`Error:::${e.message}`);
    alert("Có lỗi xảy ra, xin vui lòng thử lại.");
};

const alertHaventHandledFeature = () => alert("Chức năng mang tính tượng trưng.");


const censorPhoneNumber = (phoneNumber) => {
    for (let i = phoneNumber.length - 1; i >= phoneNumber.length - 3; i--) {
        phoneNumber = phoneNumber.replaceAt(i, '*');
    }
    return phoneNumber;
};

const formatPrice = (money) => {
    let abs = Math.abs(Number(money))
    const div = (num) => {
        return ((abs / num).toFixed(1)).replace('.0', '')
    }
    if (abs >= 1e12) {
        return div(1e12) + ' nghìn tỷ'
    }
    if (abs >= 1e9) {
        return div(1e9) + ' tỷ'
    }
    if (abs >= 1e6) {
        return div(1e6) + ' triệu'
    }
    if (abs >= 1e3) {
        return div(1e3) + ' nghìn'
    }
    return money
}

const placeholders = [
    "Đường Võ Văn Ngân",
    "Đường Quang Trung",
    "Đường Nguyễn Đình Chiểu",
    "Đường Lưu Văn Lang",
    "Đường Lý Chính Thắng",
    "Đường Huỳnh Văn Bánh",
    "Đường Lê Văn Sỹ",
    "Đường Cách Mạng Tháng 8",
    "Đường Hai Bà Trưng",
    "Đường Nguyễn Trãi",
    "Đường Hoàng Diệu",
    "Đường Thanh Niên",
    "Phố Kim Mã",
    "Phố Đinh Tiên Hoàng",
    "Đường Phan Đình Phùng",
    "Thành phố Thủ Đức",
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 7",
    "Quận 8",
    "Quận 10",
    "Quận 12",
    "Quận Gò Vấp",
    "Huyện Hóc Môn",
    "Quận Ba Đình",
    "Quận Hoàn Kiếm",
    "Quận Tây Hồ",
    "Quận Long Biên",
    "Quận Cầu Giấy",
    "Quận Đống Đa",
    "Quận Hai Bà Trưng",
    "Quận Hoàng Mai",
    "Quận Thanh Xuân",
    "Quận Hà Đông"
];
let shuffled = false;
const interval = 260;
let input = null;
const onFocusText = "Tìm nhanh. VD: Vinhomes Central Park";
const randomSearchingPlaceholder = (inp) => {
    input = inp;
    if (!shuffled) {
        shuffle();
        shuffled = true;
    }
    let timer = null;
    input.onfocus = () => {
        clearInterval(timer);
        input.placeholder = onFocusText;
    };
    input.onblur = () => {
        timer = handleAppendChars(timer);
        input.placeholder = "";
    };
    timer = handleAppendChars(timer);
};

const shuffle = () => {
    for (let i = placeholders.length - 1; i > 0; i--) {
        let swapIndex = parseInt(Math.random() * i);
        [placeholders[i], placeholders[swapIndex]] = [placeholders[swapIndex], placeholders[i]];
    }
};

const handleAppendChars = () => {
    let i = 0;
    let placeholder = getRandomPlaceHolder();
    return setInterval(() => {
        if (i >= placeholder.length) {
            i = 0;
            placeholder = getRandomPlaceHolder();
            input.placeholder = "";
        }
        input.placeholder += placeholder[i];
        i++;
    }, interval);
};

const getRandomPlaceHolder = () => placeholders[parseInt(Math.random() * placeholders.length)];

const autoChangeItem = (list, cur, cb, interval = 3000) => {
    return setInterval(() => {
        if (cur >= list.length) cur = 0;
        cb(list[cur]);
        cur++;
    }, interval);
};

const getFullAddress = (address) => `${address.houseNumber}, ${address.street}, ${address.district}, ${address.city}`;

const detailRealEstate = (id) => location.href = `../html/detail_real_estate.html?id=${id}`;
const detailNews = (id) => location.href = `../html/detail_news.html?id=${id}`;

const getQuery = (q) => {
    const queryString = window.location.search;
    const parameters = new URLSearchParams(queryString);
    return parameters.get(q);
}

export {
    handleError,
    censorPhoneNumber,
    formatPrice,
    randomSearchingPlaceholder,
    autoChangeItem,
    getFullAddress,
    detailRealEstate,
    detailNews,
    alertHaventHandledFeature,
    getQuery,
};
