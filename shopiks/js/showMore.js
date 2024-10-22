const showMore = document.querySelector('.show-more');
const productsLenght = document.querySelectorAll('.row3-items-container').length;
let items = 8;

showMore.addEventListener('click', () => {
    items += 8;
    const array = Array.from(document.querySelector('.content').children);
    const visItems = array.slice(0, items);

    visItems.forEach(el => el.classList.add('is-visible'));
});
