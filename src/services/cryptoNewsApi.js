import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': 'aeb10647f0mshe551223302c2d9cp1a3c69jsn9395e172f51b',
    'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
}

const baseUrl = 'https://crypto-news16.p.rapidapi.com';

const createRequest = (url)=> ({ url, headers: cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=> ({
        getCryptoNews: builder.query({
            query: (count)=> createRequest(`/news/top/${count}`)
        })
    })
})

export const  { useGetCryptoNewsQuery } = cryptoNewsApi;