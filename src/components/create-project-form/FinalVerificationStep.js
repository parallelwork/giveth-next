import React from 'react'
import { Text, Button, Flex, Image } from 'theme-ui'
import decoratorCloud1 from '../../images/decorator-cloud1.png'
import { animated } from 'react-spring'

const FinalVerificationStep = ({ formData, setStep }) => {
  return (
    <>
      <>
        <Flex>
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              color: 'bodyLight'
            }}
          >
            Project Name
          </Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2
            }}
            onClick={() => setStep(1)}
          >
            <Text>Edit</Text>
          </Button>
        </Flex>
        <Text
          sx={{
            fontSize: 4,
            fontFamily: 'heading',
            color: 'secondary',
            mt: '9px'
          }}
        >
          {formData.projectName}
        </Text>
      </>
      <>
        <Flex>
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              color: 'bodyLight',
              mt: '16px'
            }}
          >
            Description
          </Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2,
              mt: '16px'
            }}
            onClick={() => setStep(2)}
          >
            Edit
          </Button>
        </Flex>
        <Text
          sx={{
            fontSize: 3,
            fontFamily: 'body',
            color: 'secondary',
            mt: '9px'
          }}
        >
          {formData.projectDescription}
        </Text>
      </>
      <>
        <Flex>
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              color: 'bodyLight',
              mt: '18px'
            }}
          >
            Category
          </Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2,
              mt: '18px'
            }}
            onClick={() => setStep(3)}
          >
            Edit
          </Button>
        </Flex>
        <Text>
          <pre>{JSON.stringify(formData.category, null, 2)}</pre>
        </Text>
      </>
      <>
        <Flex>
          <Text
            sx={{
              fontSize: 0,
              textTransform: 'uppercase',
              fontFamily: 'heading',
              color: 'bodyLight',
              mt: '18px'
            }}
          >
            Impact
          </Text>
          <Button
            type='button'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              pl: 2,
              mt: '18px'
            }}
            onClick={() => setStep(4)}
          >
            Edit
          </Button>
        </Flex>
        <Text
          sx={{
            fontSize: 3,
            fontFamily: 'body',
            color: 'secondary',
            mt: '9px'
          }}
        >
          {formData.projectLocation}
        </Text>
      </>
      <>
        <Image src={decoratorCloud1} />
        <br />
      </>
    </>
  )
}

export default FinalVerificationStep
