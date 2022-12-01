import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import { AuthProvider } from '../contexts/AuthContext'
import Head from "next/head"
import { ApolloProvider, gql } from '@apollo/client'
import { client } from '../lib/apollo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }: AppProps) {


  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Head>
          <title>PontoGO</title>
          </Head>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <ToastContainer autoClose={2000}/>
        </ChakraProvider>
      </AuthProvider>
    </ApolloProvider>
  )
  
}
