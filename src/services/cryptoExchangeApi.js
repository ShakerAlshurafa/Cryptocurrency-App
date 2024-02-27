import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://currency-converter-pro1.p.rapidapi.com';

const cryptoExchangeHeaders = {
    'X-RapidAPI-Key': 'aeb10647f0mshe551223302c2d9cp1a3c69jsn9395e172f51b',
    'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'
}

const createRequest = (url)=>({
    url, headers: cryptoExchangeHeaders
})

export const cryptoExchangeApi = createApi({
    reducerPath: 'cryptoExchangeApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder)=>({
        getExchange: builder.query({
            query: (base)=> createRequest(`/latest-rates?base=${base}`), 
        }),
    })
})

export const  { useGetExchangeQuery } = cryptoExchangeApi;