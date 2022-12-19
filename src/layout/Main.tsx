import * as React from 'react'
import { Container, Flex, FlexProps, Box, Button } from '@chakra-ui/react'
import { useAppSelector } from '../store/hooks'
import MapLayout from '../worldview/mapLayout/MapLayout';

const Main = (props: FlexProps) => {
  const layers = useAppSelector((state) => state.worldview.availableLayers)

  const reduxTester = () => {
    console.log(layers);
  }

  return (
    <Flex as="main" role="main" direction="column" flex="1" px="16" py="1" {...props}>
        <MapLayout />
          <Button variant="primary" onClick={reduxTester}> Redux Tester </Button>
    </Flex>
  )
}

export default Main;