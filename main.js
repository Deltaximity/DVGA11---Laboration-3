'use strict';
let container = document.querySelector('.container');
let confirmOrderBtn = document.querySelector('#confirm-order');
let confirmationModal = document.querySelector('#confirmation-modal');
let receiptModal = document.querySelector('#receipt-modal');
let modalTotalPrice = document.querySelector('#total-price');
let showReceiptBtn = document.querySelector('#show-receipt');
let closeReceiptBtn = document.querySelector('#close-receipt');
let receipt = document.querySelector('#receipt');
let orderNote = "";
let itemArray = [];

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
        // quantity.contentEditable = true; // Kan vara bra att implementera, men ej ett krav

        // HÄNDELSELYSSNARE
        addBtn.addEventListener('click', () => {
            let num = quantity.textContent;
            if (num >= 99) return;
            quantity.textContent = ++num;
            executeClick();
        });

        removeBtn.addEventListener('click', () => {
            let num = quantity.textContent;
            if (num <= 0) return;
            quantity.textContent = --num;
            executeClick();
        });
    });

    confirmOrderBtn.addEventListener('click', () => {
        orderNote = document.querySelector('#note').value;
        confirmationModal.style.display = "flex";
        modalTotalPrice.textContent = calculateTotal();
    });

    showReceiptBtn.addEventListener('click', () => {
        receipt.innerHTML = "";
        receiptModal.style.display = "block";
        if (itemArray.length <= 0) {
            receipt.insertAdjacentHTML("beforeend", "<p>Inga beställda varor.</p>");
        } else {
            itemArray.forEach(item => {
                let row = `<li><p>${item.name}</p><p>${item.price}:-</p></li>`;
                receipt.insertAdjacentHTML("beforeend", row);
            });
            receipt.insertAdjacentHTML("beforeend", `<p>---------------------</p>`);
            receipt.insertAdjacentHTML("beforeend", `<li><p><strong>Summa:</strong></p><p><strong>${calculateTotal()}:-</strong></p></li>`);
            receipt.insertAdjacentHTML("beforeend", `<p>---------------------</p>`);
            receipt.insertAdjacentHTML("beforeend", `<div><p><strong>Notering:</strong></p></div>`);
            if (orderNote !== "") {
                receipt.insertAdjacentHTML("beforeend", `<div><p>${orderNote}</p></div>`);
            } else {
                receipt.insertAdjacentHTML("beforeend", `<div><p>-</p></div>`)
            }
        }
    });

    closeReceiptBtn.addEventListener('click', () => {
        receiptModal.style.display = "none";
    });
});

function executeClick() {
    let items = document.querySelectorAll('.quantity');
    let itemsCount = document.querySelector('#total-items');
    let totalCount = document.querySelector('#total-cost');
    let total = 0;
    items.forEach(item => {
        total += Number(item.textContent);
    });
    itemsCount.textContent = total;
    totalCount.textContent = calculateTotal();
}

function calculateTotal() {
    itemArray = [];
    let items = document.querySelectorAll('.item');
    let totalPrice = 0;
    items.forEach(item => {
        let name = item.querySelector('h2').textContent;
        let price = item.querySelector('.price').textContent.slice(0, -2); // tar bort ":-"
        let quantity = item.querySelector('.quantity').textContent;
        totalPrice += Number(price) * Number(quantity);
        
        if (quantity != 0) {
            for (let i = 0; i < quantity; i++) {
                itemArray.push({name, price});
            }
        }
    });
    return totalPrice;
}

// SKRIV UT CONTROLS + EVENT LISTENERS ✅
// HÄMTA PRIS PÅ FÖREMÅL MED BUBBLE CAPTURING // ALTERNATIVT GENOM ATT HÄMTA ITEMS ✅
// SKRIV "SLUTFÖR ORDER" FUNKTIONALITET ✅
// BERKÄKNA TOTAL SUMMA PÅ KVITTOT ✅
// SMÅ FINJUSTERINGAR