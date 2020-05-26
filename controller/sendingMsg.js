
require('dotenv').config()

const accountSid = process.env.ACCOUNT_SID;
console.log(accountSid); //confirming this isnt undefined
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

exports.getMessagePage = (req, res, next) => {
    res.send('Hi restful api, cld I rest now');
}

exports.postMessage = (req, res, next) => {
    const name = req.body.name;
    const address = req.body.address;
    const clientNumber = req.body.clientno;
    console.log(clientNumber);
    const message = req.body.message;
    const image_url = req.body.imageurl

    const clientNumberArray = clientNumber.split(",");
    console.log(clientNumberArray);

    if (clientNumberArray > 1) {
        clientNumberArray.forEach(item => {
            client.messages.create(
                {   
                    name: name,
                    address: address,
                    from: 'whatsapp:+14155238886',
                    to: `whatsapp:${item.trim()}`,
                    body: message,
                    mediaUrl: image_url
                })
                .then(message => console.log(message.sid))
                .then(result => {
                    res.status(201).json({
                        message: 'messages sent to client',
                        result: result
                    })
                })
                .catch(err => console.log(err));
        });
    } else {
        //single client number
        client.messages.create(
            {   
                name: name,
                address: address,
                from: 'whatsapp:###########',
                to: `whatsapp:${clientNumber}`,
                body: message,
                mediaUrl: image_url
            })
            .then(message => console.log(message.sid))
            .then(result => {
                res.status(201).json({
                    message: 'messages sent to client',
                    result: result
                })
            })
            .catch(err => console.log(err));
    };
};
