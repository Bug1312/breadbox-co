async function importContent() {
    let imported = document.getElementsByTagName("imported");
    for (let i = 0; i < imported.length; i++) {
        let element = imported[i];
        fetch(`/webpages/shared/imported/${element.getAttribute("type")}.html`).then(res => res.text()).then(content => {
            if (content.includes("Cannot GET"))
                console.error(`Error importing type : "${element.getAttribute("type")}" not found`);
            else
                element.outerHTML = content;
        });
    };
}

async function generateContent() {
    let generated = document.getElementsByTagName("generated");
    for (let i = 0; i < generated.length; i++) {
        let element = generated[i];
        switch (element.getAttribute("type")) {
            default:
                console.error(`Error generating type : "${element.getAttribute("type")}" not found`);
                break;
            case "items":
                fetch(`/data/items.json`).then(res => res.text()).then(text => JSON.parse(text)).then(items => {
                    fetch("/webpages/shared/generated_templates/item.html").then(res => res.text()).then(generatedItem => {
                        items.forEach(item => {
                            element.innerHTML += replaceValues(item, generatedItem);
                        });
                    });
                });
                break;
            case "cart":
                fetch(`/data/items.json`).then(res => res.text()).then(text => JSON.parse(text)).then(items => {
                    fetch("/webpages/shared/generated_templates/cart_item.html").then(res => res.text()).then(generatedItem => {
                        let tempHTML = "<table><thead><th>Quantity</td><th>Item</td><th>Price</td></thead><tbody>",
                            totalItems = 0,
                            totalFCS = 0,
                            totalDiamonds = 0;
                        Object.keys(localStorage).filter(key => /^item_/.test(key)).forEach(fullKey => {
                            let key = fullKey.replace(/^item_/, ""),
                                item = items.find(i => i.name == key);
                            let amount = Number(localStorage[fullKey]),
                                defaultAmount = item.default_amount == undefined ? 1 : item.default_amount,
                                FCS = Math.ceil((item.cost.FCS / defaultAmount) * amount),
                                diamonds = Math.ceil((item.cost.diamonds / defaultAmount) * amount);

                            totalItems += amount;
                            totalFCS += FCS;
                            totalDiamonds += diamonds;

                            tempHTML += replaceValues(item, generatedItem, {
                                amount,
                                calculated: {
                                    FCS,
                                    diamonds
                                }
                            });

                        });
                        tempHTML += `</tbody><tfoot><th>${totalItems}</td><th>Total</td><th><a href="https://flexcrop.net/economy">$${totalFCS}FCS</a><span class="cart-diamonds_container"><p>${totalDiamonds}</p><img class="diamond_icon" src="/images/diamond.png" pixelized="true"></span></td></tfoot></table>`
                        element.outerHTML = tempHTML;
                    });
                });
                break;
        }
    };
}

function replaceValues(item, generatedHTML, extraData = {}) {
    return generatedHTML.replaceAll(/%\([^)]*\)/g, match => {
        let key = match.replaceAll(/(^%\(|\)$)/g, ''),
            value = recursiveValue(item, key);

        if (value == undefined) // Default values
            switch (key) {
                default:
                    if (recursiveValue(extraData, key) == undefined) return "";
                    return recursiveValue(extraData, key);
                case "pixelized":
                    return true;
                case "default_amount":
                    return 1;
                case "desc":
                    return "";
                case "css.left.text":
                case "css.right.text":
                    return "white";
                case "css.left.background":
                case "css.right.background":
                    return "#645542";
            };
        return value;
    });
}

function recursiveValue(object, keyString) {
    return new Function('item', `try { return item.${keyString}; } catch(err) { return undefined; }`)(object);
}