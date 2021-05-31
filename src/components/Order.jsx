import moment from 'moment'
import Currency from 'react-currency-formatter'

function Order({ id, amount, amountShipping, items, timestamp, images }) {
    
    return (
        <div className="relative border rounded-md shadow-md">
            <div className="flex items-center space-x-10 px-5 py-7 bg-gray-100 text-sm text-gray-600">
                <div>
                    <p className="text-xs font-bold">ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
                </div>
                <div>
                    <p className="font-bold text-xs">TOTAL</p>
                    <p>
                        <Currency quantity={amount} currency="INR" />
                        - Fast Delivery
                        <Currency quantity={amountShipping} currency="INR" />
                    </p>
                </div>
                <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right pr-3  text-blue-500">{items.length} items</p>
                <p className="absolute top-2 right-2 w-40 lg:w-32 truncate text-xs whitespace-nowrap">Order #{id}</p>
            </div>

            <div className="p-5 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto order_overflow">
                    {images.map((image, index) => (
                        <img key={index} src={image} className="h-20 object-contain mx-2 sm:h-32" alt="" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order
