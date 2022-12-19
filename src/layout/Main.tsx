import * as React from 'react'
import { Container, Flex, FlexProps, Box, Button } from '@chakra-ui/react'
import { useAppSelector } from '../store/hooks'
import { getUser } from '../localStorage/localStorage';
import MapLayout from '../worldview/mapLayout/MapLayout';

const Main = (props: FlexProps) => {
  const user = useAppSelector((state) => state.user);
  const layers = useAppSelector((state) => state.worldview.availableLayers)


  const reduxTester = () => {
    // console.log(user);
    // console.log(getUser())
    console.log(layers);

  }

  return (
    <Flex as="main" role="main" direction="column" flex="1" p="16" {...props}>
        <MapLayout />
          <Button variant="primary" onClick={reduxTester}> Redux Tester </Button>
    </Flex>
  )
}

export default Main;