import { GET_PROJECT_BY_ADDRESS } from '../apollo/gql/projects'
import { GET_USER_BY_ADDRESS } from '../apollo/gql/auth'
import Web3 from 'web3'

export function titleCase(str) {
  if (!str) return null
  return str
    ?.toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase())
    })
    .join(' ')
}

export function base64ToBlob(base64) {
  const binaryString = window.atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; ++i) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return new Blob([bytes], { type: 'application/pdf' })
}

export async function getEtherscanTxs(
  address,
  apolloClient = false,
  isDonor = false
) {
  try {
    const apiKey = process.env.ETHERSCAN_API_KEY
    const api = process.env.GATSBY_NETWORK_ID === '3' ? 'api-ropsten' : 'api'
    const balance = await fetch(
      `https://${api}.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
    )
      .then(response => response.json())
      .then(data => {
        return data?.result
      })

    return await fetch(
      `https://${api}.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
    )
      .then(response => response.json())
      .then(async data => {
        const modified = []
        if (data?.status === '0' || typeof data?.result === 'string') {
          return {
            balance,
            txs: [],
            error: data?.result
          }
        }
        for (const t of data?.result) {
          const extra = apolloClient
            ? await apolloClient?.query({
                query: isDonor ? GET_USER_BY_ADDRESS : GET_PROJECT_BY_ADDRESS,
                variables: {
                  address: Web3.utils.toChecksumAddress(t?.to)
                }
              })
            : null
          modified.push({
            ...t,
            extra: extra?.data || null,
            donor: t.from,
            createdAt: t.timeStamp,
            currency: 'ETH'
          })
        }
        return {
          balance,
          txs: modified
        }
      })
  } catch (error) {
    console.log({ error })
  }
}
