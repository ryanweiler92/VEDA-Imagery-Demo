import * as React from 'react'
import { Container, Flex, FlexProps, Box, Button } from '@chakra-ui/react'
import { useAppSelector } from '../store/hooks'
import { getUser } from '../localStorage/localStorage';

const Main = (props: FlexProps) => {
  const user = useAppSelector((state) => state.user);

  const reduxTester = () => {
    console.log(user);
    console.log(getUser())
  }

  return (
    <Flex as="main" role="main" direction="column" flex="1" py="16" {...props}>
      <Container flex="1">
          <Button variant="primary" onClick={reduxTester}> Redux Tester </Button>
        <Box minH="lg" bg="bg-accent" />
      </Container>
    </Flex>
  )
}

export default Main;