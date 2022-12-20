import React, { useEffect, useContext } from "react"
import { Box, Button, Flex, Heading, List, ListItem, Text, Icon, Divider, IconButton } from "@chakra-ui/react";
import MapContext from "../../mapLayout/MapContext";
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { setAvailableLayers, setOrderedLayers } from "../../../slices/worldview/worldviewSlice";
import DragDropDisplay from "./DragDropDisplay";

const ActiveLayerDisplay = () => {
    const { map, layerData } = useContext(MapContext);
    const dispatch = useAppDispatch();
    const availableLayers = useAppSelector((state) => state.worldview.availableLayers);
    const orderedLayers = useAppSelector((state) => state.worldview.orderedLayers);

    // checking the state of visibility property for switches
    const activeCheck = (layerID) => {
        if (availableLayers[layerID].visible) {
            return true
        } else {
            return false
        }
    }

    // toggling visibility from switches
    const toggleVisibility = (layerName, layerID) => {
        map.getLayers().forEach((layer) => {
            if (layer.className_ === layerName) {
                const isVisible = layer.get('visible')
                layer.setVisible(!isVisible)
            }
        });
        const isVisible = availableLayers[layerID].visible;
        const availableLayersCopy = [...availableLayers];
        const updatedLayer = { ...availableLayersCopy[layerID], visible: !isVisible };
        availableLayersCopy[layerID] = updatedLayer;
        dispatch(setAvailableLayers(availableLayersCopy));
    }

    const removeLayer = (layerName, layerID) => {
        layerData.forEach((layer) => {
            if (layer.className_ === layerName) {
                map.removeLayer(layer)
            }
        });
        const availableLayersCopy = [...availableLayers];
        const updatedLayer = { ...availableLayersCopy[layerID], visible: true, active: false };
        availableLayersCopy[layerID] = updatedLayer;
        dispatch(setAvailableLayers(availableLayersCopy));
    }

    // ordering the layers in the display
    useEffect(() => {
        if (!map) return;
        const orderedLayersArr = map.getLayers().array_
        if(!orderedLayersArr.length) return;

        const createOrder = () => {
            let mapOrderedLayers = [];

            orderedLayersArr.forEach((layer) => {
                mapOrderedLayers.push(layer.className_);
            });

            let tempOrderedLayers = [];

            mapOrderedLayers.map((layer) => {
                availableLayers.forEach(layerObj => {
                    if (layerObj.name === layer) {
                        tempOrderedLayers.push(layerObj);
                    }
                });
            });
            dispatch(setOrderedLayers(tempOrderedLayers));
        }
        createOrder();
    }, [map, availableLayers]);

    // this gets called whenever a layer is added, removed or reordered
    useEffect(() => {
        if (!map) return;

        const updateMapLayersOnReorder = () => {
            const layerCopy = [...layerData]

            layerData.slice().forEach((layer) => {
                map.removeLayer(layer)
            });

            orderedLayers.map((layer) => {
                layerCopy.forEach((layerObj) => {
                    if (layer.name === layerObj.className_) {
                        map.addLayer(layerObj);
                    }
                });
            });
        }
        updateMapLayersOnReorder();
    }, [orderedLayers]);

    return (
        <Box bg="teal.400" borderRadius="md" w="33%">
            <DragDropDisplay 
            toggleVisibility={toggleVisibility}
            removeLayer={removeLayer}
            activeCheck={activeCheck}
            />
        </Box>
    )
}

export default ActiveLayerDisplay;

