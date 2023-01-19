import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Badge,
  Switch,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  Icon,
  Spacer,
} from "@chakra-ui/react";
import OpenLayersMap from "../map/OpenLayersMap";
import LeafletMap from "../map/LeafletMap";
import AvailableLayerDisplay from "../layerDisplays/availableLayersDisplay/AvailableLayersDisplay";
import ActiveLayerDisplay from "../layerDisplays/activeLayerDisplay/ActiveLayersDisplay";
import MapContext from "./MapContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DateSelector from "../dateSelector/DateSelector";
import ApiTest from "../api/ApiTest";

const ApiTestingLayout = () => {
  // openlayers map obj is a non-serializable value so we cannot store in Redux. Creating local state and passing through context.
  const [map, setMap] = useState(null);
  // layer data is a non-serializable value so we cannot store in Redux. Creating local state and passing through context.
  const [layerData, setLayerData] = useState([]);

  const [leafletDisplay, setLeafletDisplay] = useState(false);
  const [openLayersDisplay, setOpenLayersDisplay] = useState(false);

  const [viewProperties, setViewProperties] = useState({
    centerCoords: [-72.7, 42.05],
    latlonCoords: "0, 0",
    resolution: 38496,
    rotation: 0,
    zoom: 7,
  });

  return (
    <MapContext.Provider
      value={{
        layerData,
        setLayerData,
        map,
        setMap,
        setViewProperties,
        viewProperties,
      }}
    >
      <Box>
        <ApiTest />
      </Box>
      <Flex justify="center" my="2">
        <Flex justify="center" align="center">
          <Text fontWeight="bold">Toggle Map Displays</Text>
          <Box mx="3">
            <Badge variant="outline" colorScheme="green" mx="1">
              Leaflet Map
            </Badge>
            <Switch
              colorScheme="green"
              isChecked={!leafletDisplay}
              onChange={() => setLeafletDisplay(!leafletDisplay)}
            />
          </Box>
          <Box mx="3">
            <Badge variant="outline" colorScheme="blue" mx="1">
              OpenLayers Map
            </Badge>
            <Switch
              colorScheme="blue"
              isChecked={!openLayersDisplay}
              onChange={() => setOpenLayersDisplay(!openLayersDisplay)}
            />
          </Box>
        </Flex>
      </Flex>
      <Box hidden={leafletDisplay}>
        <Flex justify="center">
          <Text fontSize="3xl" fontWeight="bold">
            Leaflet Map
          </Text>
        </Flex>
        <Flex id="OSMAP-container" justify="center">
          <LeafletMap />
        </Flex>
      </Box>
      <Box hidden={openLayersDisplay}>
        <Flex justify="center">
          <Text fontSize="3xl" fontWeight="bold">
            OpenLayers Map
          </Text>
        </Flex>
        <OpenLayersMap />
        <Flex>
          <AvailableLayerDisplay />
          <DateSelector />
          <DndProvider backend={HTML5Backend}>
            <ActiveLayerDisplay />
          </DndProvider>
        </Flex>
      </Box>
    </MapContext.Provider>
  );
};

export default ApiTestingLayout;
