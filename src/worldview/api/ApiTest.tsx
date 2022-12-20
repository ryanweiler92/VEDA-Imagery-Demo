import React, { useContext, useState, useRef, useEffect } from "react"
import { Box, Button, Flex, IconButton, Heading, List, ListItem, Text, Icon, Spinner, Spacer, Select } from "@chakra-ui/react";
import axios from "axios"
import { PhoneIcon, InfoIcon } from '@chakra-ui/icons';
import { apiCalls } from "./apiConfig";

const ApiTest = () => {
    const [responseOne, setResponseOne] = useState();
    const [responseTwo, setResponseTwo] = useState();
    const [responseThree, setResponseThree] = useState();
    const [callUrlOne, setCallUrlOne] = useState();
    const [callTitleOne, setCallTitleOne] = useState();
    const [callDescriptionOne, setCallDescriptionOne] = useState();
    const [callUrlTwo, setCallUrlTwo] = useState();
    const [callTitleTwo, setCallTitleTwo] = useState();
    const [callDescriptionTwo, setCallDescriptionTwo] = useState();
    const [callUrlThree, setCallUrlThree] = useState();
    const [callTitleThree, setCallTitleThree] = useState();
    const [callDescriptionThree, setCallDescriptionThree] = useState();
    const [loadingOne, setLoadingOne] = useState(false);
    const [loadingTwo, setLoadingTwo] = useState(false);
    const [loadingThree, setLoadingThree] = useState(false);

    async function getResponseOne() {
        setLoadingOne(true)
        try {
          const response = await axios.get('https://staging-raster.delta-backend.com/mosaic/7743bcb31bff7151aff7e5508785fce1/info');
          const data = response.data;
          setResponseOne(data);
        } catch (error) {
          console.error(error);
        } finally {
            setLoadingOne(false);
        }
      }

      async function getResponseTwo() {
        setLoadingTwo(true)
        try {
          const response = await axios.get('https://staging-raster.delta-backend.com/mosaic/7743bcb31bff7151aff7e5508785fce1/info');
          const data = response.data;
          setResponseTwo(data);
        } catch (error) {
          console.error(error);
        } finally {
            setLoadingTwo(false)
        }
      }

      async function getResponseThree() {
        setLoadingThree(true)
        try {
          const response = await axios.get('https://staging-raster.delta-backend.com/mosaic/7743bcb31bff7151aff7e5508785fce1/info');
          const data = response.data;
          setResponseThree(data);
        } catch (error) {
          console.error(error);
        } finally {
            setLoadingThree(false)
        }
      }

      const consoleResponse = (e) => {
        if(e.target.id == "button1"){
            console.log(responseOne)
        } else if(e.target.id == "button2"){
            console.log(responseTwo)
        } else if(e.target.id == "button2"){
            console.log(responseThree)
        }
      }

      const handleSelect = (e) => {
        if(!e.target.value) return
        const value = JSON.parse(e.target.value)
        if(e.target.id == "select1"){
            setCallUrlOne(value.url)
            setCallTitleOne(value.title)
            setCallDescriptionOne(value.description)
        } else if (e.target.id == "select2"){
            setCallUrlTwo(value.url)
            setCallTitleTwo(value.title)
            setCallDescriptionTwo(value.description)
        } else if (e.target.id == "select3") {
            setCallUrlThree(value.url)
            setCallTitleThree(value.title)
            setCallDescriptionThree(value.description)
        }
      }
        
    return (
        <>
        <Flex justify="space-around" align="center" my="2">
            <Button 
            aria-label="fetch" 
            colorScheme='teal'
            size='lg'
            onClick={getResponseOne}
            isLoading={loadingOne}
            isDisabled={!callUrlOne}
            >
            <PhoneIcon mr="2" /> Fetch
            </Button>
            <Button 
            aria-label="fetch" 
            colorScheme='red'
            size='lg'
            onClick={getResponseTwo}
            isLoading={loadingTwo}
            isDisabled={!callUrlTwo}
            >
            <PhoneIcon mr="2" /> Fetch
            </Button>
            <Button 
            aria-label="fetch" 
            colorScheme='blue'
            size='lg'
            onClick={getResponseThree}
            isLoading={loadingThree}
            isDisabled={!callUrlThree}
            >
            <PhoneIcon mr="2" /> Fetch
            </Button>
        </Flex>
        <Flex w="100%" bg="gray.100" h="300px"> 
            <Flex align="center" direction="column" h="100%" w="33%" border="2px solid black">
                <Select defaultValue="disabled" id="select1" bg="teal.300" borderRadius="0" textAlign="center" onChange={(e) => handleSelect(e)}>
                    <option value="disabled" disabled>Select an API Request</option>
                    {apiCalls.map((call) => {
                        return (
                        <option key={call.title} value={ JSON.stringify({url: call.url, description: call.description, title: call.title})}>{call.title}</option>
                        )
                    })}
                </Select>
                <Heading size='md' my="2">{callTitleOne}</Heading>
                <Text align="center" my="2">{callDescriptionOne}</Text>
                <Text align="center" my="2">{callUrlOne}</Text>
            </Flex>
            <Flex align="center" direction="column" h="100%" w="33%" border="2px solid black">
                <Select defaultValue="disabled" id="select2" bg="teal.300" borderRadius="0" textAlign="center" onChange={(e) => handleSelect(e)}>
                    <option value="disabled" disabled>Select an API Request</option>
                    {apiCalls.map((call) => {
                        return (
                        <option key={call.title} value={ JSON.stringify({url: call.url, description: call.description, title: call.title})}>{call.title}</option>
                        )
                    })}
                </Select>
                <Heading size='md' my="2">{callTitleTwo}</Heading>
                <Text align="center" my="2">{callDescriptionTwo}</Text>
                <Text align="center" my="2">{callUrlTwo}</Text>
            </Flex>
            <Flex align="center" direction="column" h="100%" w="33%" border="2px solid black">
                <Select defaultValue="disabled" id="select3" bg="teal.300" borderRadius="0" textAlign="center" onChange={(e) => handleSelect(e)}>
                    <option value="disabled" disabled>Select an API Request</option>
                    {apiCalls.map((call) => {
                        return (
                        <option key={call.title} value={ JSON.stringify({url: call.url, description: call.description, title: call.title})}>{call.title}</option>
                        )
                    })}
                </Select>
                <Heading size='md' my="2">{callTitleThree}</Heading>
                <Text align="center" my="2">{callDescriptionThree}</Text>
                <Text align="center" my="2">{callUrlThree}</Text>
            </Flex>
        </Flex>
        <Flex justify="space-around" align="center" my="2">
            <Button 
            aria-label="fetch" 
            colorScheme='teal'
            size='lg'
            onClick={(e) => consoleResponse(e)}
            id="button1"
            isLoading={loadingOne}
            disabled={!responseOne}
            >
                <InfoIcon mr="2"/> Console
            </Button>

            <Button 
            aria-label="fetch" 
            colorScheme='red'
            size='lg'
            onClick={(e) => consoleResponse(e)}
            id="button2"
            isLoading={loadingTwo}
            disabled={!responseTwo}
            >
                <InfoIcon mr="2"/> Console
            </Button>
            <Button 
            aria-label="fetch" 
            colorScheme='blue'
            size='lg'
            onClick={(e) => consoleResponse(e)}
            id="button3"
            isLoading={loadingThree}
            disabled={!responseThree}
            >
                <InfoIcon mr="2"/> Console
            </Button>
        </Flex>
        </>
    )
}

export default ApiTest;