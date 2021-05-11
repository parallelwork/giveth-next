import dynamic from 'next/dynamic'
import { Flex, Text } from 'theme-ui'

const ReactJson = dynamic(import('react-json-view'), { ssr: false })

function ErrorPage({ json, msg }) {
  return (
    <Flex sx={{ flexDirection: 'column', mx: '5%' }}>
      <Text variant='headings.h4' sx={{ mb: 4 }}>
        There was an error :(
      </Text>
      {json ? <ReactJson src={JSON.parse(json)} /> : <p> {msg}</p>}
    </Flex>
  )
}

export default ErrorPage
