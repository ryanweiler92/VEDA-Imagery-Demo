import { useCallback} from "react";
import {
  Flex,
  Heading,
  List,
  Divider,
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { setOrderedLayers } from "../../../slices/worldview/worldviewSlice";
import OrderedLayers from "./OrderedLayers";

const DragDropDisplay = ({ toggleVisibility, removeLayer }) => {
  const orderedLayers = useAppSelector(
    (state) => state.worldview.orderedLayers
  );

  const availableLayers = useAppSelector(
    (state) => state.worldview.availableLayers
  );

  const dispatch = useAppDispatch();

  let reversedLayers = [...orderedLayers].reverse()

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
      {availableLayers &&
          availableLayers.map((layer, index) => {
            if (layer.active)
              return (
              <OrderedLayers
                key={layer.name}
                layer={layer}
                index={index}
                moveLayerListItem={moveLayerListItem}
                toggleVisibility={toggleVisibility}
                removeLayer={removeLayer}
              />
              )
          })}
      </List>
    </>
  );
};

export default DragDropDisplay;
