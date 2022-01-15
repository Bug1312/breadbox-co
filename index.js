const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    Discord = require("discord.js"),
    bot = new Discord.Client();

const botData = require(__dirname + "/public/data/bot.json"),
    itemData = require(__dirname + "/public/data/items.json");

require('dotenv').config();

// Load website
{
    app.use(express.static(__dirname + "/public"));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.listen(process.env.PORT, () => {
        console.log(`HTTP RUNNING`);
    });
}

// Pages 
{
    app.get("/", (request, response) => {
        response.sendFile(__dirname + "/public/webpages/main/index.html")
    });

    app.get("/checkout", (request, response) => {
        response.sendFile(__dirname + "/public/webpages/checkout/index.html")
    });

    app.get("/LICENSE", (request, response) => {
        response.sendFile(__dirname + "/LICENSE");
    });
}

// Fetches
{
    app.post("/post-order", function(request, response) {
        let keys = Object.keys(request.body);
        if (keys.filter(key => key.includes('item_')).length && keys.filter(key => key.includes('form')).length)
            bot.channels.cache.get(botData.channels.orders).send(createOrderMessage(request.body));
    });
}

// Helper Functions
{
    // Site 
    {
        function createOrderMessage(order) {
            let form = JSON.parse(order.form),
                data = {
                    ign: form.ign,
                    discord: form.discord,
                    total: 0,
                    items: [],
                    giftBoolean: form.giftBoolean,
                    giftee: form.giftee,
                    currency: form.currency
                };

            Object.keys(order).filter(key => key.includes('item_')).forEach(item => {
                let orderItem = JSON.parse(order[item]);
                data.total += orderItem.amount;

                data.items.push(
                    formatMessage('item', {
                        itemID: orderItem.item,
                        amount: orderItem.amount
                    })
                );
            });
            return formatMessage('order', data);
        };
    }

    // Bot Code
    {
        function formatMessage(type, data = {}) {
            switch (type) {
                case 'order':
                    return `\`\`\` \`\`\`\n\`${data.ign}\` / \`${data.discord}\` want's to buy\nwith an overall price: \`${(data.currency == "FCS")? `$${data.total}FCS`:`${data.total} diamonds`}\`\n\n${data.items.join('\n')}\n\n${(data.giftBoolean) ? `for \`${data.giftee}\`\n` : ''}\n\`\`\` \`\`\``;
                case 'item':
                    return `${data.itemID}#${data.amount}`;
                default:
                    console.error(`Error formatting message : "${type}" is not a valid type`);
            };
        };
    }
}

// Start bot
{
    // bot.login(process.env.TOKEN);
}