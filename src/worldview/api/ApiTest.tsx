// To make a new static request (ie. you know the exact URL of your request) just add it to the apiConfig.tsx file as a new object with a title, description and url field
// at the end of the array.
// To make custom requests (ie. dynamically setting url parameters with a function) do the following:
//  1. Create a new file in the customRequests directory 
//  2. Define and export your logic from the new file. !!Make sure to pass setResponse as an arguement to your function.
//  3. In apiConfig.ts, add a new object to the end of the array with properties of title, description, url and customReference. Make sure the customReference is unique.
//  4. Import your custom request function.
//  5. Add a new case to the switch statement that refers to the customReference value you created in apiConfig.ts 
import React, { useState } from "react"
import { Box, Button, Flex, IconButton, Heading, List, ListItem, Text, Icon, Spinner, Spacer, Select } from "@chakra-ui/react";
import axios from "axios"
import { PhoneIcon, InfoIcon } from '@chakra-ui/icons';
import { GiSave, GiMaterialsScience } from 'react-icons/gi'
import { GoGlobe } from 'react-icons/go'
import { apiCalls } from "./apiConfig";
import { 
    testResponseOneData, 
    testResponseTwoData,
    testResponseThreeData
} from './dataTestingFunctions';
import findDatesWithinTimeframe from './customRequests/findDates';
// Import any custom request files you make here

const ApiTest = () => {
    const [customReference, setCustomReference] = useState();
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

    const customRequestHandler = (setResponse) => {
        // Make a new case that refers to the customReference value you created in apiConfig.tsx and make sure to pass it setResponse as an argument.
        console.log(customReference)
        switch (customReference){
            case '1':
                findDatesWithinTimeframe(setResponse);
                break;
            case 'default':
                console.log('Invalid reference. Make sure to include a unique customReference in the apiConfig file and make a case in the switch statement.')
        }
    }

    async function getResponseOne() {
        if(callUrlOne === "customRequest"){
            customRequestHandler(setResponseOne)
            return;
        }
        setLoadingOne(true)
        try {
          const response = await axios.get(callUrlOne);
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
          const response = await axios.get(callUrlTwo);
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
          const response = await axios.get(callUrlThree);
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
        } else if(e.target.id == "button3"){
            console.log(responseThree)
        }
      }

      const handleSelect = (e) => {
        if(!e.target.value) return
        const value = JSON.parse(e.target.value)
            console.log(value)
            setCustomReference(value.customReference)
        
        if(e.target.id == "select1"){
            setCallTitleOne(value.title)
            setCallDescriptionOne(value.description)
            setCallUrlOne(value.url)
        } else if (e.target.id == "select2"){
            setCallTitleTwo(value.title)
            setCallDescriptionTwo(value.description)
            setCallUrlTwo(value.url)
        } else if (e.target.id == "select3") {
            setCallTitleThree(value.title)
            setCallDescriptionThree(value.description)
            setCallUrlThree(value.url)
        }
      }

      const saveToLocalStorage = (e) => {
        console.log(e.target)
        if(e.target.id == "save1"){
            localStorage.setItem('response1', JSON.stringify(responseOne));
            console.log("Response 1 saved to local storage.")
        } else if (e.target.id == "save2"){
            localStorage.setItem('response2', JSON.stringify(responseTwo));
            console.log("Response 2 saved to local storage.")
        } else if (e.target.id == "save3") {
            localStorage.setItem('response3', JSON.stringify(responseThree));
            console.log("Response 3 saved to local storage.")
        }
      }

      const fetchLocalStorage = (e) => {
        if(e.target.id == "test1"){
            const lsData = localStorage.getItem('response1');
            if(!lsData){console.log('No data found in local storage for response 1.')}
            const response = JSON.parse(lsData);
            testResponseOneData(response);
        } else if (e.target.id == "test2"){
            const lsData = localStorage.getItem('response2');
            if(!lsData){console.log('No data found in local storage for response 2.')}
            const response = JSON.parse(lsData);
            testResponseTwoData(response);
        } else if (e.target.id == "test3") {
            const lsData = localStorage.getItem('response3');
            if(!lsData){console.log('No data found in local storage for response 3.')}
            const response = JSON.parse(lsData);
            testResponseThreeData(response);
        }
      }

    //   const testFunction = () => {
    //     console.log(callUrlOne)
    //     console.log(responseOne)
    //   }
        
    return (
        <>
        {/* <Button onClick={testFunction}>Test</Button> */}
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
                <Select defaultValue="disabled" id="select1" bg="teal.300" borderRadius="0" textAlign="center" fontWeight="bold" onChange={(e) => handleSelect(e)}>
                    <option value="disabled" disabled>Select an API Request</option>
                    {apiCalls.map((call) => {
                        return (
                        <option key={call.title} value={ JSON.stringify({url: call.url, description: call.description, title: call.title, customReference: call.customReference})}>{call.title}</option>
                        )
                    })}
                </Select>
                <Heading textAlign="center" size='md' my="2">{callTitleOne}</Heading>
                <Text align="center" my="2">{callDescriptionOne}</Text>
                <Text align="center" my="2">{callUrlOne}</Text>
            </Flex>
            <Flex align="center" direction="column" h="100%" w="33%" border="2px solid black">
                <Select defaultValue="disabled" id="select2" bg="teal.300" borderRadius="0" textAlign="center" fontWeight="bold" onChange={(e) => handleSelect(e)}>
                    <option value="disabled" disabled>Select an API Request</option>
                    {apiCalls.map((call) => {
                        return (
                        <option key={call.title} value={ JSON.stringify({url: call.url, description: call.description, title: call.title, customReference: call.customReference})}>{call.title}</option>
                        )
                    })}
                </Select>
                <Heading textAlign="center" size='md' my="2">{callTitleTwo}</Heading>
                <Text align="center" my="2">{callDescriptionTwo}</Text>
                <Text align="center" my="2">{callUrlTwo}</Text>
            </Flex>
            <Flex align="center" direction="column" h="100%" w="34%" border="2px solid black">
                <Select defaultValue="disabled" id="select3" bg="teal.300" borderRadius="0" textAlign="center" fontWeight="bold" onChange={(e) => handleSelect(e)}>
                    <option value="disabled" disabled>Select an API Request</option>
                    {apiCalls.map((call) => {
                        return (
                        <option key={call.title} value={ JSON.stringify({url: call.url, description: call.description, title: call.title, customReference: call.customReference})}>{call.title}</option>
                        )
                    })}
                </Select>
                <Heading textAlign="center" size='md' my="2">{callTitleThree}</Heading>
                <Text align="center" my="2">{callDescriptionThree}</Text>
                <Text align="center" my="2">{callUrlThree}</Text>
            </Flex>
        </Flex>
        <Flex justify="space-around" align="center" my="2">
            <Flex>
                <Flex direction="column">
                    <Button 
                    aria-label="fetch" 
                    colorScheme='teal'
                    size='lg'
                    onClick={(e) => consoleResponse(e)}
                    id="button1"
                    isLoading={loadingOne}
                    disabled={!responseOne}
                    mb="2"
                    >
                        <InfoIcon mr="2"/> Console
                    </Button>
                    <Button
                    aria-label="save"
                    colorScheme='teal'
                    size='lg'
                    isDisabled={!responseOne}
                    id="save1"
                    onClick={(e) => saveToLocalStorage(e)}
                    isLoading={loadingOne}
                    >
                        <GiSave /> Save
                    </Button>
                </Flex>
                <Flex direction="column" ml="1">
                    <Button 
                    aria-label="test data" 
                    colorScheme='teal'
                    size='lg'
                    onClick={(e) => fetchLocalStorage(e)}
                    id="test1"
                    isLoading={loadingOne}
                    // disabled={!responseOne}
                    mb="2"
                    >
                        <GiMaterialsScience /> Test Data
                    </Button>
                    <Button 
                    aria-label="apply to map" 
                    colorScheme='teal'
                    size='lg'
                    id="map1"
                    isLoading={loadingOne}
                    disabled={true}
                    mb="2"
                    >
                        <GoGlobe /> Apply To Map
                    </Button>
                </Flex>
            </Flex>
            <Flex>
            <Flex direction="column">
                <Button 
                aria-label="console" 
                colorScheme='red'
                size='lg'
                onClick={(e) => consoleResponse(e)}
                id="button2"
                isLoading={loadingTwo}
                disabled={!responseTwo}
                mb="2"
                >
                    <InfoIcon mr="2"/> Console
                </Button>
                <Button
                aria-label="save"
                colorScheme='red'
                size='lg'
                disabled={!responseTwo}
                id="save2"
                onClick={(e) => saveToLocalStorage(e)}
                isLoading={loadingTwo}
                >
                    <GiSave /> Save 
                </Button>
            </Flex>
            <Flex direction="column" ml="1">
                <Button 
                aria-label="test data" 
                colorScheme='red'
                size='lg'
                onClick={(e) => fetchLocalStorage(e)}
                id="test2"
                isLoading={loadingTwo}
                // disabled={!responseTwo}
                mb="2"
                >
                    <GiMaterialsScience /> Test Data
                </Button>
                <Button 
                aria-label="apply to map" 
                colorScheme='red'
                size='lg'
                id="map2"
                isLoading={loadingTwo}
                disabled={true}
                mb="2"
                >
                    <GoGlobe /> Apply To Map
                </Button>
                </Flex>
            </Flex>
            <Flex>
            <Flex direction="column">
                <Button 
                aria-label="fetch" 
                colorScheme='blue'
                size='lg'
                onClick={(e) => consoleResponse(e)}
                id="button3"
                isLoading={loadingThree}
                disabled={!responseThree}
                mb="2"
                >
                    <InfoIcon mr="2"/> Console
                </Button>
                <Button
                aria-label="save"
                colorScheme='blue'
                size='lg'
                isDisabled={!responseThree}
                id="save3"
                onClick={(e) => saveToLocalStorage(e)}
                isLoading={loadingThree}
                >
                    <GiSave /> Save
                </Button>
            </Flex>
            <Flex direction="column" ml="1">
                <Button 
                aria-label="test data" 
                colorScheme='blue'
                size='lg'
                onClick={(e) => fetchLocalStorage(e)}
                id="test3"
                isLoading={loadingThree}
                // disabled={!responseThree}
                mb="2"
                >
                    <GiMaterialsScience /> Test Data
                </Button>
                <Button 
                aria-label="apply to map" 
                colorScheme='blue'
                size='lg'
                id="map3"
                isLoading={loadingThree}
                mb="2"
                disabled={true}
                >
                    <GoGlobe /> Apply To Map
                </Button>
                </Flex>
            </Flex>
        </Flex>
        </>
    )
}

export default ApiTest;