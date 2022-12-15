import * as React from 'react'
import { Container, Flex, FlexProps } from '@chakra-ui/react'

const Main = (props: FlexProps) => {
  return (
    <Flex as="main" role="main" direction="column" flex="1" py="16" {...props}>
      <Container flex="1">
        {/* <Placeholder minH="lg" bg="bg-accent">
          Main
        </Placeholder> */}
      </Container>
    </Flex>
  )
}

export default Main;