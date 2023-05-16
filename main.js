'use strict';
let container = document.querySelector('.container');

window.addEventListener('load', () => {
    let html = "";
    for (let i = 0; i < Object.keys(menu).length; i++) {
        let key = Object.keys(menu)[i];
        let array = menu[key];

        html = `<div class="category">`;
        html += `<h1>${key}</h1>`;

        array.forEach(obj => {
            html += `<div class="item"><div><h2>${obj.name}</h2><span class="price">${obj.price}:-</span>`;
            if (obj.contents !== undefined) {
                html += `<p class="contents">`;
                obj.contents.forEach(ingredient => {
                    if (ingredient.startsWith("a:")) {
                        ingredient = ingredient.slice(2); // tar bort "a:"
                        html += `<strong>${ingredient}</strong>, `;
                    } else {
                        html += `${ingredient}, `;
                    }
                });
                html = html.substring(0, html.length - 2); // tar bort ", "
                html += `</p>`;
            }
            html += `</div></div>`;
        });

        html += `</div>`;
        container.insertAdjacentHTML("beforeend", html);
    }
});