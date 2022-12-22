import * as React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import myTheme from './theme';
import ApiTestingPage from '../src/layout/ApiTestingPage';
import ImageryPage from "./layout/ImageryPage";
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import OpenStreetPage from './layout/OpenStreetPage';


export const App = () => (
  <BrowserRouter>
    <ChakraProvider theme={myTheme}>
      <Routes>
        <Route path="/" element={<ImageryPage />} />
        <Route path="/apitesting" element={<ApiTestingPage />} />
        <Route path="/openstreet" element={<OpenStreetPage/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
      </Routes>
    </ChakraProvider>
  </BrowserRouter>
)
