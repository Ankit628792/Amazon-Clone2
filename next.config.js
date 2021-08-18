module.exports = {
    images : {
        domains: ['links.papareact.com', 'fakestoreapi.com']
    },
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY ,
        stripe_secret_key: process.env.STRIPE_SECRET_KEY ,
        stripe_signing_secret: process.env.STRIPE_SIGNING_SECRET ,
        google_id: process.env.GOOGLE_ID ,
        google_secret: process.env.GOOGLE_SECRET ,
        nextAuth_URL: process.env.NEXTAUTH_URL ,
        host: process.env.HOST
    }
}