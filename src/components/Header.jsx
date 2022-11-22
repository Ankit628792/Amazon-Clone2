import Image from 'next/image'
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'
import { useState } from 'react'

function Header() {
    const [session] = useSession();
    const router = useRouter();
    const items = useSelector(selectItems)

    const [input, setInput] = useState('');

    const searchProduct = (type) => {
        router.push({
            pathname: '/',
            query: {
                category: type
            }
        })
    }

    return (
        <header>
            <div className="text-center flex bg-amazon_blue p-1 flex-grow py-2">
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                    <Image
                        onClick={() => router.push('/')}
                        src="https://links.papareact.com/f90"
                        width={150}
                        height={40}
                        objectFit="contain"
                        className="cursor-pointer"
                        alt=''
                    />
                </div>

                <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
                    <input className="p-2 pl-4 h-full w-6 flex-grow rounded-l-md flex-shrink focus:outline-none" value={input} type="text" onChange={(e) => setInput(e.target.value)} />
                    <SearchIcon className="h-12 p-4" onClick={() => {
                        (input.length > 2) && searchProduct(input)
                    }} />
                </div>

                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    <div onClick={() => !session ? signIn('google') : signOut()} className="link">
                        <p className="capitalize">
                            {session ? `Hello, ${session.user.name}` : "Sign In"}
                        </p>
                        <p className="font-bold md:text-sm">Account & Lists</p>
                    </div>
                    <div onClick={() => router.push('/orders')} className="link">
                        <p>Returns</p>
                        <p className="font-bold md:text-sm">& Ordes</p>
                    </div>
                    <div onClick={() => router.push('/checkout')} className="link relative flex items-center">
                        <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">{items.length}</span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline font-bold md:text-sm mt-2">Basket</p>
                    </div>
                </div>

            </div>

            <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                <p onClick={() => searchProduct("all")} className="link flex items-center"><MenuIcon className="h-6 mr-1" /> All</p>
                <p onClick={() => searchProduct("men's clothing")} className="link">Men's Clothing</p>
                <p onClick={() => searchProduct("jewelery")} className="link">Jewelery</p>
                <p onClick={() => searchProduct("women's clothing")} className="link">Women's Clothing</p>
                <p onClick={() => searchProduct("electronics")} className="link">Electronics</p>
                <p onClick={() => searchProduct("sports")} className="link hidden lg:inline-flex">Sports</p>
                <p onClick={() => searchProduct("kitchen")} className="link hidden lg:inline-flex">Kitchen</p>
                <p onClick={() => searchProduct("grocery")} className="link hidden lg:inline-flex">Food & Grocery</p>
                <p onClick={() => searchProduct("health care")} className="link hidden lg:inline-flex">Health Care</p>
            </div>
        </header>
    )
}

export default Header
