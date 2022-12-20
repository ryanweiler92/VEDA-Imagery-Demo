import React, { useRef, useState, useEffect } from "react"
import { Box, Button, Flex, Heading, List, ListItem, Text, Icon, Spacer } from "@chakra-ui/react";
import Map from '../map/Map'
import AvailableLayerDisplay from '../layerDisplays/availableLayersDisplay/AvailableLayersDisplay';
import ActiveLayerDisplay from "../layerDisplays/activeLayerDisplay/ActiveLayersDisplay";
import MapContext from './MapContext';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DateSelector from "../dateSelector/DateSelector";

const ApiTestingLayout = () => {
  // openlayers map obj is a non-serializable value so we cannot store in Redux. Creating local state and passing through context.
  const [map, setMap] = useState(null);
  // layer data is a non-serializable value so we cannot store in Redux. Creating local state and passing through context.
  const [layerData, setLayerData] = useState([])

  return (
    <MapContext.Provider value={{
      layerData,
      setLayerData,
      map,
      setMap
    }}>
      <Flex justify="center">
        <Text fontSize="3xl">NASA GIBS Imagery</Text>
      </Flex>
      <Map />
      <Flex >
        <AvailableLayerDisplay/>
        <DateSelector />
        <DndProvider backend={HTML5Backend}>
          <ActiveLayerDisplay />
        </DndProvider>
      </Flex>
    </MapContext.Provider>
  );
}

export default ApiTestingLayout;