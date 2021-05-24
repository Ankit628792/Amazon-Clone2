import Header from '../components/Header'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

function success() {
    const router = useRouter()
    return (
        <div className="bg-grey-100 h-screen">
            <Header />

            <main className="max-w-screen-lg mt-5 mx-auto">
                <div className=" bg-white p-6 text-center">
                    <div className="flex items-center space-x-2 mb-5 justify-center">
                        <CheckCircleIcon className="text-green-500 h-10" />
                        <h1>Thank you, Your order has been cofirmed!</h1>
                    </div>
                    <p>
                        Thank you for shopping with us. We'll send a confirmation once your item has shipped.<br />
                        Happy Shopping ! 🎉🥳🤩
                    </p>
                    <button onClick={() => router.push('/orders')} className="button mt-8">Go to my orders</button>
                </div>
            </main>
        </div>
    )
}

export default success
