import React, { useRef, useState, useEffect } from "react"
import Map from '../map/Map'
import AvailableLayerDisplay from '../layerDisplays/AvailableLayersDisplay';
import { Box, Button, Flex, Heading, List, ListItem, Text, Icon, Spacer } from "@chakra-ui/react";


const MapLayout = () => {

  return (
    <>
      <Map />
      <Flex >
        <AvailableLayerDisplay />
        <Spacer />
        <div />
      </Flex>
      
    </>
  );
}

export default MapLayout;