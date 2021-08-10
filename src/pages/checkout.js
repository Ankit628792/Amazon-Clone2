import Header from '../components/Header'
import CheckoutProduct from '../components/CheckoutProduct'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import Currency from 'react-currency-formatter'
import { useSession } from 'next-auth/client'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
const stripePromise = loadStripe(process.env.stripe_public_key)

function Checkout() {
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal) * 10;
    const [session] = useSession();
    
    const discount = 0;
    const delivery = 149

    alert('inside checkout');
    const createCheckoutSession = async () => {
                const stripe = await stripePromise;
        
        console.log("stripe ", stripe);
//         try {  

//             const checkoutSession = await axios.post('/api/create-checkout-session',
//                 {
//                     items: items,
//                     email: session.user.email
//                 })
//             }catch(error) {
//                 console.log('error is here');
//             }
        
    
            const result = await stripe.redirectToCheckout({
                sessionId: checkoutSession.data.id
            })

            if (result.error) {
                alert(result.error.message);
            }
      
    }

    return (
        <div className="bg-gray-100">
            
            <Header />

            <main className="lg:flex max-w-screen-xl mx-auto">

                <div className="flex-grow m-5 shadow-sm">
                    <Image src="https://links.papareact.com/ikj" width={1020} height={250} />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4 font-medium">
                            {items.length === 0 ? "Your Amazon Basket is empty" : "Shopping Basket"}
                        </h1>

                        {items.map(({ product }, i) => (
                            <CheckoutProduct key={i} id={product.id} title={product.title} rating={product.rating} price={product.price} description={product.description} category={product.category} image={product.image} hasPrime={product.hasPrime} />
                        )
                        )}
                    </div>
                </div>

                {items.length > 0 && (
                    <div className="flex flex-col bg-white p-10 w-full shadow-md">
                        <>
                            <h1 className="text-3xl border-b pb-3 font-medium">
                                Price Details
                        </h1>
                            <div className="whitespace-nowrap w-full flex flex-row justify-between pr-4 py-2">
                                <h2 className="whitespace-nowrap">Price ({items.length} item): </h2>
                                <h2 className="font-bold">
                                    <Currency quantity={total} currency="INR" />
                                </h2>
                            </div>
                            <div className="whitespace-nowrap w-full flex flex-row justify-between pr-4 py-2">
                                <h2 className="whitespace-nowrap">Discount </h2>
                                <h2 className="font-bold">
                                    <Currency quantity={discount} currency="INR" />
                                </h2>
                            </div>
                            <div className="whitespace-nowrap w-full flex flex-row justify-between pr-4 py-2">
                                <h2 className="whitespace-nowrap">Delivery Charges </h2>
                                <h2 className="font-bold">
                                    <Currency quantity={delivery} currency="INR" />
                                </h2>
                            </div>
                            <div className="whitespace-nowrap border-b border-t text-xl pb-3 w-full flex flex-row justify-between pr-4 py-2">
                                <h1 className="font-medium">Total Price: </h1>
                                <h1 className="font-bold">
                                    <Currency quantity={(total - discount + delivery)} currency="INR"  />
                                </h1>
                            </div>

                            <button
                                role="link"
                                onClick={createCheckoutSession}
                                disabled={!session}
                                className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-100 py-3 cursor-not-allowed font-semibold'}`}>
                                {!session ? 'SignIn To Checkout' : 'Proceed To Checkout'}
                            </button>
                        </>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Checkout
