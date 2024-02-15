import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequst = (url)=>({
    url, headers:cryptoApiHeaders 
})

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'aeb10647f0mshe551223302c2d9cp1a3c69jsn9395e172f51b',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi', 
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder)=>({
        getCryptos: builder.query({
            query:(count)=> createRequst(`/coins?limit=${count}`)
        })
    })
})


// add (use) in first and (Query) in end to the same word in the endpoints
export const { useGetCryptosQuery } = cryptoApi;


// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coins',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       timePeriod: '24h',
//       'tiers[0]': '1',
//       orderBy: 'marketCap',
//       orderDirection: 'desc',
//       limit: '50',
//       offset: '0'
//     },
//     headers: {
//       'X-RapidAPI-Key': 'aeb10647f0mshe551223302c2d9cp1a3c69jsn9395e172f51b',
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
//   };
  