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
            html += `</div><div class="controls"></div></div>`;
        });

        html += `</div>`;
        container.insertAdjacentHTML("beforeend", html);
    }

    // CONTROLS
    let controls = document.querySelectorAll('.controls');
    controls.forEach(control => {
        let quantity = document.createElement('div');
        let removeBtn = document.createElement('div');
        let addBtn = document.createElement('div');
        let quantityTextNode = document.createTextNode('0');
        let removeBtnTextNode = document.createTextNode('-');
        let addBtnTextNode = document.createTextNode('+');
        quantity.appendChild(quantityTextNode);
        removeBtn.appendChild(removeBtnTextNode);
        addBtn.appendChild(addBtnTextNode);
        quantity.classList.add('quantity');
        removeBtn.classList.add('remove');
        addBtn.classList.add('add');
        control.appendChild(removeBtn);
        control.appendChild(quantity);
        control.appendChild(addBtn);
        // quantity.contentEditable = true; // Kan vara något bra att implementera, men inget krav

        // FUNKTIONER
        addBtn.addEventListener('click', () => {
            let num = quantity.textContent;
            if (num >= 99) return;
            quantity.textContent = ++num;
        });

        removeBtn.addEventListener('click', () => {
            let num = quantity.textContent;
            if (num <= 0) return;
            quantity.textContent = --num;
        });
    });
});

// SKRIV UT CONTROLS + EVENT LISTENERS ✅
// HÄMTA PRIS PÅ FÖREMÅL MED BUBBLE CAPTURING
// SKRIV "SLUTFÖR ORDER" FUNKTIONALITET