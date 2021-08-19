import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useState } from 'react'
import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux'
import { addToBasket } from '../slices/basketSlice'


const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
    const [liked, setliked] = useState(false);

    const like = () => {
        liked ? setliked(false) : setliked(true);
    }

    const dispatch = useDispatch();
    const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING)

    const [hasPrime] = useState(Math.random() < 0.5)

    const addItemToBasket = () => {
        const product = {
            id, title, rating, price, description, category, image, hasPrime
        }

        dispatch(addToBasket({ product }))
    }
    return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-10 shadow-lg rounded-md">
            <div onClick={like} className="absolute top-2 right-4 rounded-full bg-white shadow-lg  w-12 h-12 flex items-center justify-center cursor-pointer z-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill={liked ? 'red' : 'grey'}>
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
            </div>

            <p className="absolute top-4 left-4 text-xs italic text-gray-400">{category}</p>
            <Image src={image} height={200} width={200} objectFit="contain" />
            <h4 className="my-3">{title}</h4>
            <div className="flex">
                {Array(rating).fill().map((_, i) =>
                    (<StarIcon key={i} className="h-5 text-yellow-500" />)
                )}
            </div>
            <p className="text-xs my-2 line-clamp-2">{description}</p>

            <div className="mb-5">
                <Currency quantity={price * 10} currency="INR" />
            </div>

            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                    <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>
                </div>
            )}

            <button onClick={addItemToBasket} className="mt-auto button shadow-md">Add To Basket</button>

        </div>
    )
}

export default Product
