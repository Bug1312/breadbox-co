function showPopup(parent) {
    document.querySelectorAll(".cart_popup").forEach(element => {
        element.setAttribute("closed", "");
    });
    if (parent != undefined)
        parent.querySelector(".cart_popup").removeAttribute("closed");
}

function closePopup() {
    setTimeout(() => {
        document.querySelectorAll(".cart_popup").forEach(element => {
            element.setAttribute("closed", "");
        });
    }, 10);
}

function updateItemCalcs(parent) {
    let elAmount = parent.querySelector(".cart_popup-amount"),
        elFCS = parent.querySelector(".cart_popup-cost_fcs"),
        elDiamonds = parent.querySelector(".cart_popup-cost_diamonds");
    let amount = Math.ceil(elAmount.value),
        calcFCS = eval(elFCS.getAttribute("calc")),
        calcDiamonds = eval(elDiamonds.getAttribute("calc"));

    elFCS.innerHTML = Math.ceil(calcFCS * amount);
    elDiamonds.innerHTML = Math.ceil(calcDiamonds * amount);
}

function addToCart(elItem = document.body, negative = false) {
    let name = elItem.getAttribute("name"),
        amount = elItem.querySelector(".cart_popup-amount").value,
        key = `item_${name}`;

    if (!localStorage[key]) localStorage[key] = 0;
    if (negative) localStorage[key] = Number(localStorage[key]) - Math.ceil(amount);
    else localStorage[key] = Number(localStorage[key]) + Math.ceil(amount);

    if (localStorage[key] < 0) localStorage.removeItem(key);

    closePopup();
}