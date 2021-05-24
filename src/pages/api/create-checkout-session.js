const stripe = require('stripe')(sk_test_51Iu55mSHt26EdXYYscl0zWMSHJDZ9Oqv5sM64qZMH01XglNTbw12ChPG85n8LIt0CCx9bazm0XOCzSiFG986CrDq00n2YQ8710);

export default async (req, res) => {
    const { items, email } = req.body;
    const transformedItems = items.map((item) => ({

        description: item.product.description,
        quantity: 1,
        price_data: {
            currency: 'inr',
            unit_amount: item.product.price * 1000,
            product_data: {
                name: item.product.title,
                images: [item.product.image]
            }
        }
    }))


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_rates: ['shr_1Iu5fASHt26EdXYY99cHlrM6'],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'IN']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `https://amazon-clone2-3q5ouixdt-final.vercel.app/success`,
        cancel_url: `https://amazon-clone2-3q5ouixdt-final.vercel.app/checkout`,
        metadata: {
            email: email,
            images: JSON.stringify(items.map((item) => item.product.image))
        }
    })

    res.status(200).json({ id: session.id })
}

// stripe listen --forward-to localhost:3000/api/webhook
//  assure-vouch-endear-love
//  whsec_cANFOk7e7zN76l22HazcMK17bcVYcyrz
