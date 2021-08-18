

export default async (req, res) => {
    const stripe = await require('stripe')(process.env.stripe_secret_key);

    let { items, email } = req.body;

    const transformedItems = items.map((item) => ({
        quantity: 1,
        description: item.product.description,
        currency: 'inr',
        amount: Math.floor(item.product.price) * 1000,
        name: item.product.title,
        images: [item.product.image]
    }))

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            shipping_rates: ["shr_1Iu5fASHt26EdXYY99cHlrM6"],
            shipping_address_collection: {
                allowed_countries: ['GB', 'US', 'IN']
            },
            line_items: transformedItems,
            mode: "payment",
            success_url: `${process.env.host}/success`,
            cancel_url: `${process.env.host}/checkout`,
            customer_email: email,
            metadata: {
                email: email,
                images: JSON.stringify(items.map((item) => item.product.image))
            },
        });

        return res.status(200).json({ id: session.id });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ message: 'error to create session' })
    }

}

// stripe listen --forward-to localhost:3000/api/webhook
