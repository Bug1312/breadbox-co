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
                            element.innerHTML += generatedItem.replaceAll(/%\([^)]*\)/g, match => {
                                let key = match.replaceAll(/(^%\(|\)$)/g, '');
                                let value = new Function('item', `try { return item.${key}; } catch(err) { return undefined; }`)(item);

                                if (value == undefined) // Default values
                                    switch (key) {
                                        default:
                                            return "";
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
                        });
                    });
                });
                break;
        }
    };
}