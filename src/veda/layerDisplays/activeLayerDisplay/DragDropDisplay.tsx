import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  Icon,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { setOrderedLayers } from "../../../slices/worldview/worldviewSlice";
import OrderedLayers from "./OrderedLayers";

const DragDropDisplay = ({ toggleVisibility, removeLayer, activeCheck }) => {
  const orderedLayers = useAppSelector(
    (state) => state.worldview.orderedLayers
  );
  const dispatch = useAppDispatch();
  const moveLayerListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = orderedLayers[dragIndex];
      const hoverItem = orderedLayers[hoverIndex];

      const updatedLayers = [...orderedLayers];
      updatedLayers[dragIndex] = hoverItem;
      updatedLayers[hoverIndex] = dragItem;
      dispatch(setOrderedLayers(updatedLayers));
    },
    [orderedLayers]
  );

  return (
    <>
      <Flex align="center" justify="center">
        <Heading size="md" color="white" mb="2" fontWeight="normal">
          Active Layers
        </Heading>
      </Flex>
      <Divider borderWidth="1px" mb="2" />
      <List>
        {orderedLayers &&
          orderedLayers.map((layer, index) => {
            return (
              <OrderedLayers
                key={layer.name}
                layer={layer}
                index={index}
                moveLayerListItem={moveLayerListItem}
                toggleVisibility={toggleVisibility}
                removeLayer={removeLayer}
                activeCheck={activeCheck}
              />
            );
          })}
      </List>
    </>
  );
};

export default DragDropDisplay;
