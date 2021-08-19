import Head from "next/head";
import Header from '../components/Header'
import Banner from '../components/Banner'
import ProductFeed from '../components/ProductFeed'
import Footer from '../components/Footer'
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";

export default function Home({ products }) {
  const router = useRouter();
  const {category} = router.query;
  return (
    <div className="bg-gray-100 overflow-x-hidden">

      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        <ProductFeed products={products} type={category} />
      </main>

      <Footer />
      
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const products = await fetch('https://fakestoreapi.com/products').then(
    (res) => res.json()
  );

  return {
    props: {
      products, session
    }
  }
}

//Get -> https://fakestoreapi.com/products