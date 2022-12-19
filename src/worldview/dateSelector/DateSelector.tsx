import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, Flex, Heading, List, ListItem, Text, Icon, Divider, IconButton } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setDate } from "../../slices/worldview/worldviewSlice";
import "./DateSelector.css"

const DateSelector = () => {
    const dispatch = useAppDispatch();
    const date = useAppSelector((state) => state.worldview.date);

    const myDate = new Date(Date.parse(date));

    return (
        <Flex w="33%" justify="center">
            <div>
            <DatePicker 
            selected={myDate} 
            onChange={(myDate) => dispatch(setDate(myDate.toISOString()))}
            id="datePicker" 
            />
            </div>
        </Flex>
    )
}

export default DateSelector