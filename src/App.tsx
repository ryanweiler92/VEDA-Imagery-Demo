import * as React from "react"
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Text,
  Link as ChakraLink,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import myTheme from './theme';
import Layout from '../src/layout/Layout';
import Login from './components/login/Login'

export const App = () => (
  <BrowserRouter>
    <ChakraProvider theme={myTheme}>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />}/>
      </Routes>
    </ChakraProvider>
  </BrowserRouter>
)
