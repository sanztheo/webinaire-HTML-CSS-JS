// Gestion des dropdowns
const titles = document.querySelectorAll('.title-definition');

titles.forEach(title => {
    title.addEventListener('click', e => {
        const definition = e.target.closest('.definition');
        definition.classList.toggle('open');
        const img = definition.querySelector('img');
        if(img.getAttribute('src') === 'img/ferme.png')
            img.setAttribute('src', 'img/ouvert.png');
        else
            img.setAttribute('src', 'img/ferme.png');
    });
});


// Gestion du slider
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const slider = document.querySelector('.languages-content');
const nbElements = slider.childElementCount;
let i = 0;
right.addEventListener('click', () => {
    if(i < nbElements - 4)
        i++;
    else
        i = 0;

    updateSlider(i);
});

left.addEventListener('click', () => {
    if(i > 0)
        i--;
    else
        i = nbElements - 4;

    updateSlider(i);
});

function updateSlider(index) {
    slider.style.transform = 'translateX(' + (-index * (228 + 16)) + 'px)';
}
