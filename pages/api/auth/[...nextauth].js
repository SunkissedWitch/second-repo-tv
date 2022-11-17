import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from 'axios';
import { TV_TALK_API } from "../../../util/constants";

export const authOptions = {
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { username, password } = credentials;
        const { data } = await axios.post(`${TV_TALK_API}/auth/login`, {username, password})
        
        if (data.user) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            ...data.user,
            tv_api_token: data.token
          }
        } else {
          return null
        }
      }
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: '1831604947079646',
      clientSecret: 'eabff33f8b9d1d2da4d8a12436429b5c'
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if(user) {
        token = {
          ...token,
          username: user.username,
          zipcode: user.zipcode,
          gender: user.gender,
          tv_api_token: user.tv_api_token,
        }
      }

      return token;
    },
    async session({session, token}) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = {
        ...session.user,
        username: token.username,
        zipcode: token.zipcode,
        gender: token.gender,
        tv_api_token: token.tv_api_token
      }
      
      return session
    }
  }
}

export default NextAuth(authOptions)