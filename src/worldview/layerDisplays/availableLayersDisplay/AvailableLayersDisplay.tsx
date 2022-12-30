import React from "react";
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { setAvailableLayers } from '../../../slices/worldview/worldviewSlice';
import { Box, Button, Flex, Heading, List, ListItem, Text, Icon, Divider, IconButton } from "@chakra-ui/react";
import { AddIcon }  from '@chakra-ui/icons';

const AvailableLayerDisplay = () => {
  const dispatch = useAppDispatch();
  const availableLayers = useAppSelector((state) => state.worldview.availableLayers);

  const addLayer = (layerID) => {
    const activeLayers = [...availableLayers];
    activeLayers[layerID] = {
      ...activeLayers[layerID],
      visible: true,
      active: true,
    };
    dispatch(setAvailableLayers(activeLayers));
  };

  return (
    <Box bg="blue.400" borderRadius="md" w="33%">
      <Flex align="center" justify="center">
        <Heading size="md" color="white" mb="2" fontWeight="normal">
          Available Layers
        </Heading>
      </Flex>
      <Divider borderWidth="1px" mb="2" />
      <List>
        {availableLayers &&
          availableLayers.map((layer) => {
            if (!layer.active)
              return (
                <ListItem
                  key={layer.name}
                  w="100%"
                >
                  <Flex align="center" justify="space-between" w="100%" p="2">
                  <Text color="white">{layer.title}</Text>
                  <IconButton aria-label="Add Layer" size="sm" icon={<AddIcon />} onClick={(e) => addLayer(layer.id)} />
                  </Flex>
                  <Divider />
                </ListItem>
              );
          })}
      </List>
    </Box>
    
  )
}

export default AvailableLayerDisplay;