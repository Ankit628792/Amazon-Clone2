import { buffer } from 'micro'
import * as admin from 'firebase-admin';

//securing firebase
const serviceAccount = require("../../../permission.json");
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

//connection with stripe
const stripe = require('stripe')(process.env.stripe_secret_key)

const endpointSecret = process.env.stripe_signing_secret;

const fulfillOrder = async (session) => {
    return app.firestore().collection('user').doc(session.metadata.email).collection('orders').doc(session.id).set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log(" ")
        console.log(`Success: order ${session.id} has added to db`)
    }).catch((error) => console.log(error))
}

export default async (req, res) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers['stripe-signature']

        let event;
        //verify event posted came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (error) {
            console.log('Error ', error.message)
            return res.status(400).send(`Webhook error: ${error.message}`)
        }

        //handle checkout session completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            //fulfill the order
            return fulfillOrder(session).then(() => res.status(200)).catch((error) => res.status(400).send('Webhook error'))
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}
