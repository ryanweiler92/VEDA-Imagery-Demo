import * as React from 'react'
import { Container, Flex, FlexProps, Box, Button } from '@chakra-ui/react'
import ImageryLayout from '../worldview/mapLayout/ImageryLayout';
import Navbar from './Navbar';
import ESRIMap from '../arcgis/map/ArcGISMap';

const ArcGISPage = (props: FlexProps) => {

  return (
    <Flex direction="column" flex="1">
      <Navbar />
      <Flex as="main" role="main" direction="column" flex="1" px="16" py="1" {...props}>
          <ESRIMap />
      </Flex>
    </Flex>
  )
}

export default ArcGISPage