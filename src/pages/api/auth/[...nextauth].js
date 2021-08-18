import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    // OAuth authentication providers...
   
    // Providers.Facebook({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    Providers.Google({
      clientId: process.env.google_id,
      clientSecret: process.env.google_secret
    }),
    // Providers.Instagram({
    //   clientId: process.env.INSTAGRAM_ID,
    //   clientSecret: process.env.INSTAGRAM_SECRET
    // }),
  ],

})