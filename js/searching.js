import { alertHaventHandledFeature } from './helper.js';

const form = document.querySelector('.search_bar');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alertHaventHandledFeature();
});
