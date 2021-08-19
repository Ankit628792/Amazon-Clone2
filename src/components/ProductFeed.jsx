import Product from './Product'

function ProductFeed({ products, type }) {
    const shuffleArray = (array) => {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };
    const shuffleProducts = shuffleArray(products);
    return (
        <>
            <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
                {shuffleProducts.map(({ id, title, price, description, category, image }) => {
                    return (category.includes(type) || type === "all" || !type) && <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                })}

            </div>
            <img className="md:col-span-full my-10" src="https://links.papareact.com/dyz" alt="" />
        </>
    )
}

export default ProductFeed
