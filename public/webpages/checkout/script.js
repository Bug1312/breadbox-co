function giftToggleUpdate() {
    let checkbox = document.getElementById('gift'),
        textbox = document.getElementById('giftee'),
        deliverySelect = document.getElementById('deliveryOption'),
        deliveryOptions = document.querySelectorAll('#deliveryOption option');
    if (checkbox.checked) {
        textbox.removeAttribute('disabled');
        deliveryOptions.forEach(option => {
            if (option.getAttribute('giftBlock') == 'true') {
                if (option.selected) {
                    deliverySelect.selectedIndex = 0;
                };
                option.setAttribute('disabled', '');
            };
        });
    } else {
        textbox.setAttribute('disabled', '')
        deliveryOptions.forEach(option => {
            if (option.getAttribute('giftBlock') == 'true') {
                option.removeAttribute('disabled');
            };
        });
    };
};

function sendOrder(event) {
    event.preventDefault();

    let form = {
        ign: document.getElementById("mcUsername").value,
        discord: document.getElementById("discordUsername").value,
        giftBoolean: document.getElementById("gift").checked,
        giftee: document.getElementById("giftee").value,
        currency: document.getElementById("currencyOption").value
    };

    localStorage["form"] = JSON.stringify(form);

    fetch("/post-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(window.localStorage)
    }).then(response => {
        localStorage.clear();
        window.location = '/';
    });
};