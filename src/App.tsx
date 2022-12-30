import * as React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import myTheme from './theme';
import ApiTestingPage from '../src/layout/ApiTestingPage';
import ImageryPage from "./layout/ImageryPage";
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import ArcGISPage from './layout/ArcGISPage';


export const App = () => (
  <BrowserRouter>
    <ChakraProvider theme={myTheme}>
      <Routes>
        {/* <Route path="/" element={<ImageryPage />} />
        <Route path="/apitesting" element={<ApiTestingPage />} /> */}
        <Route path="/" element={<ApiTestingPage />} />
        {/* <Route path="/arcgis" element={<ArcGISPage />} /> */}
      </Routes>
    </ChakraProvider>
  </BrowserRouter>
)
