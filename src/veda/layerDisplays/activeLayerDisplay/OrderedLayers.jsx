import React, { useRef } from "react"
import { Box, Button, Flex, Switch, Heading, List, ListItem, Text, Icon, Divider, IconButton } from "@chakra-ui/react";
import { useDrag, useDrop } from 'react-dnd'
import { DeleteIcon }  from '@chakra-ui/icons';

const OrderedLayers = (props) => {
    const {
        toggleVisibility,
        removeLayer,
        activeCheck,
        layer,
        index,
        moveLayerListItem,
    } = props;

    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index: index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [spec, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return

            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveLayerListItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    });

    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));

    return (
       
        <ListItem ref={dragDropRef} py="2">
            <Flex justify="space-between" align="center" pl="2">
                <Flex>
                    <Text color="white">
                        {(index + 1) + ":"}
                    </Text>
                    <Text pl="2" color="white">
                        {layer.title}
                    </Text>
                </Flex>
                <Flex justify="space-between" align="center" pr="2">
                    <Switch 
                    id={layer.id}
                    isChecked={activeCheck(layer.id)}
                    onChange={(e) => toggleVisibility(layer.name, layer.id)}
                    pr="2" 
                    />
                    <IconButton aria-label="Remove Layer" size="sm" icon={<DeleteIcon />} onClick={(e) => removeLayer(layer.name, layer.id)} />
                </Flex>
            </Flex>
            <Divider mt="1"/>
        </ListItem>
    )
}

export default OrderedLayers;
