const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    }}))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates:  ["shr_1Iu5fASHt26EdXYY99cHlrM6"],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'IN']
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        customer_email: email,
        metadata: {
            email: email,
            images: JSON.stringify(items.map((item) => item.product.image))
        },
      });
    
    return res.status(200).json({ id: session.id });

    }

// stripe listen --forward-to localhost:3000/api/webhook
